module.exports = {
  friendlyName: 'Signup',

  description: 'Sign up for a new user account.',

  extendedDescription: `This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,

  inputs: {
    email: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.',
    },

    firstName: {
      required: true,
      type: 'string',
      example: 'John',
      description: 'The first name of the user.',
    },

    lastName: {
      required: true,
      type: 'string',
      example: 'Doe',
      description: 'The last name of the user.',
    },

    userType: {
      required: true,
      type: 'string',
      isIn: ['volunteer', 'organiser'],
      example: 'volunteer or organiser',
      description: 'The user type in the system.',
    },
  },

  exits: {
    success: {
      description: 'New user account was created successfully.',
    },

    invalid: {
      responseType: 'badRequest',
      description:
        'The provided first name, last name, user type, password and/or email address are invalid.',
      extendedDescription:
        'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.',
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },

  fn: async function (inputs) {
    var newEmail = inputs.email.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create(
      _.extend(
        {
          email: newEmail,
          password: await sails.helpers.passwords.hashPassword(inputs.password),
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          userType: inputs.userType,
          tosAcceptedByIp: this.req.ip,
        },
        sails.config.custom.verifyEmailes
          ? {
            emailProofToken: await sails.helpers.strings.random(
                'url-friendly'
            ),
            emailProofTokenExpiresAt:
                Date.now() + sails.config.custom.emailProofTokenTTL,
            emailStatus: 'unconfirmed',
          }
          : {}
      )
    )
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    if (sails.config.custom.enableBillingFeatures) {
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo
        .with({
          email: newEmail,
        })
        .timeout(5000)
        .retry();
      await User.updateOne({ id: newUserRecord.id }).set({
        stripeCustomerId,
      });
    }

    // Store the user's new id in their session.
    // this.req.session.userId = newUserRecord.id;

    if (sails.config.custom.verifyEmailes) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmail,
        subject: 'Please confirm your account',
        template: 'email-verify-account',
        templateData: {
          fullName: inputs.fullName,
          token: newUserRecord.emailProofToken,
        },
      });
    } else {
      sails.log.info(
        'Skipping new account email verification... (since `verifyEmailes` is disabled)'
      );
    }
  },
};
