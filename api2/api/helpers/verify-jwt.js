const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const verifyAsync = promisify(jwt.verify);

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',
  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    },
    res: {
      type: 'ref',
      friendlyName: 'Response',
      description: 'A reference to the response object (res).',
      required: false
    }
  },
  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: async function (inputs, exits) {
    const {req} = inputs;
    if (req.header('authorization')) {
      // if one exists, attempt to get the header data
      const token = req.header('authorization').split('Bearer ')[1];
      // if there's nothing after "Bearer", no go
      if (!token) {
        sails.log.error('Found invalid token');
        return exits.invalid();
      }
      // if there is something, attempt to parse it as a JWT token
      try {
        const payload = await verifyAsync(token, '111');
        //sails.log.info('Got payload', payload);

        if (!payload.id && !payload.email) {
          return exits.invalid();
        }

        const user = await User.findOne(payload.id);
        if (!user) {
          return exits.invalid();
        }
        // sails.log.info('Found corresponding user', user);
        // if it got this far, everything checks out, success
        req.user = user;
        return exits.success(user);
      } catch(err) {
        sails.log.error('Error when validating token');
        return exits.invalid();
      }
    } else {
      return exits.invalid();
    }
  }
};
