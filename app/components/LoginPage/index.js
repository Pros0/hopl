import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Cookies } from 'react-cookie';
import Router from 'next/router';

import Logo from '../Logo';
import Alert from '../Alert';
import messages from './messages';
import { getGatewayUsersLogin } from '../../utils/gateways';
import fetcher from '../../utils/fetcher';
import withAuth from '../../hocs/withAuth';
import {
  PageWrapper,
  LogoWrapper,
  ContentWrapper,
  Form,
  StyledCard,
  Title,
  Subtitle,
  StyledButton,
} from './styles';

const Login = () => {
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = (event) => {
    event.preventDefault();

    fetcher(getGatewayUsersLogin(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (resp.error) {
          setResponse(
            resp.error?.details?.[0]
              ? { error: resp?.error?.details?.[0] }
              : resp,
          );
        } else if (!resp.token) {
          setResponse({ error: { message: 'Error logging in.' } });
        } else {
          const cookies = new Cookies();
          cookies.set('token', resp.token);
          Router.push('/');
        }
      })
      .catch((error) => {
        setResponse(error?.details?.[0] || error);
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
        <Title>
          {formatMessage(messages.mainTitle)}{' '}
          <span role="img" aria-label="wave">
            👋
          </span>
        </Title>
        <Subtitle>{formatMessage(messages.subtitle)}</Subtitle>
        <StyledCard>
          <Form method="post" onSubmit={submit}>
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
              label={formatMessage(messages.passwordInputPlaceholder)}
              variant="outlined"
              margin="normal"
              type="password"
              name="password"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <StyledButton fullWidth variant="contained" type="submit">
              {formatMessage(messages.loginButton)}
            </StyledButton>
          </Form>

          {response && response.error && (
            <Alert severity="error">
              {response.error.message ||
                formatMessage(messages.defaultErrorMsg)}
            </Alert>
          )}
        </StyledCard>
        <Typography component="h2" variant="subtitle1" gutterBottom>
          {formatMessage(messages.createAccountTitle)}
        </Typography>
        <NextLink href="/signup">
          <Link margin="normal" href="/signup">
            {formatMessage(messages.createAccountLinkText)}
          </Link>
        </NextLink>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default withAuth({
  WrappedComponent: Login,
  redirectTo: '/',
  shouldBeLoggedIn: false,
});
