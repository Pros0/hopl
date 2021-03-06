import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Router from 'next/router';
import Logo from '../Logo';
import Alert from '../Alert';
import withAuth from '../../hocs/withAuth';
import messages from './messages';
import login from '../../requests/login';
import signUp from '../../requests/signUp';
import { LogoWrapper, ContentWrapper } from '../common/NotLoggedIn/styles';
import { Form, Card } from '../common/Form/styles';
import { PageWrapper, Title, Subtitle, Button } from './styles';

const SignUp = () => {
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState({ userType: 'volunteer' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData(formData);
  };
  const submit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    signUp({
      body: formData,
      onComplete: () =>
        login({
          body: { email: formData.email, password: formData.password },
          onComplete: () => Router.push('/'),
          onError: (r) => setResponse(r),
          onFinally: () => setIsSubmitting(false),
        }),
      onError: (r) => {
        setResponse(r);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <PageWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <ContentWrapper>
        <Title>{formatMessage(messages.mainTitle)} </Title>
        <Subtitle>{formatMessage(messages.subtitle)}</Subtitle>
        <Card disabled={isSubmitting}>
          <Form onSubmit={submit}>
            <TextField
              required
              fullWidth
              label={formatMessage(messages.emailInputPlaceholder)}
              variant="outlined"
              margin="normal"
              name="email"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <TextField
              required
              fullWidth
              label={formatMessage(messages.firstNameInputPlaceholder)}
              variant="outlined"
              margin="normal"
              name="firstName"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <TextField
              required
              fullWidth
              label={formatMessage(messages.lastNameInputPlaceholder)}
              variant="outlined"
              margin="normal"
              name="lastName"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <TextField
              required
              fullWidth
              label={formatMessage(messages.passwordInputPlaceholder)}
              variant="outlined"
              margin="normal"
              type="password"
              name="password"
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <RadioGroup
              required
              defaultValue="volunteer"
              aria-label="userType"
              name="userType"
              onChange={handleChange}
            >
              <FormControlLabel
                value="volunteer"
                control={<Radio />}
                label="Volunteer"
              />
              <FormControlLabel
                value="organisation"
                control={<Radio />}
                label="Organisation"
              />
            </RadioGroup>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="secondary"
            >
              {formatMessage(messages.signUpButton)}
            </Button>
          </Form>

          {response && (
            <Alert severity={response.error ? 'error' : 'success'}>
              {response.error
                ? response.error.message
                : `User with email ${response.email} was successfully created!`}
            </Alert>
          )}
        </Card>
        <Subtitle component="h2" variant="subtitle1" gutterBottom>
          {formatMessage(messages.backToLoginTitle)}
        </Subtitle>
        <NextLink href="/login">
          <Link color="secondary" margin="normal" href="/login">
            {formatMessage(messages.backToLoginLinkText)}
          </Link>
        </NextLink>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default withAuth({
  WrappedComponent: SignUp,
  redirectTo: '/',
  shouldBeLoggedIn: false,
});
