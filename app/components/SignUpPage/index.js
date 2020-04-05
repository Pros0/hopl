import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import Logo from '../Logo';
import Alert from '../Alert';
import { getGatewayUsers } from '../../utils/gateways';
import fetcher from '../../utils/fetcher';
import withAuth from '../../hocs/withAuth';
import messages from './messages';
import {
  LogoWrapper,
  ContentWrapper,
  Form,
  Card,
} from '../common/NotLoggedIn/styles';
import { PageWrapper, Title, Subtitle, Button } from './styles';

const SignUp = () => {
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    fetcher(getGatewayUsers(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        setResponse(resp);
      })
      .catch((error) => {
        setResponse(error);
      })
      .finally(() => {
        setIsSubmitting(false);
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
