import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
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
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const newFormData = { ...formData };
    if (e.target.name !== 'userType') {
      newFormData[e.target.name] = e.target.value;
    } else {
      newFormData.roles = [e.target.value];
    }
    setFormData(newFormData);
  };
  const submit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { userType, ...body } = formData;
    signUp({
      body,
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

            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              required
              defaultValue="applicant"
              aria-label="userType"
              name="userType"
              onChange={handleChange}
            >
              <FormControlLabel
                value="applicant"
                control={<Radio />}
                label="Volunteer"
              />
              <FormControlLabel
                value="organiser"
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
