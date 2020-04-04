import React, { useState } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { Cookies } from 'react-cookie';
import Router from 'next/router';

import { getGatewayUsersLogin } from '../utils/gateways';
import fetcher from '../utils/fetcher';
import withAuth from '../hocs/withAuth';

const StyledMuiAlert = styled(MuiAlert)`
  margin-bottom: 2rem;
`;
const Alert = (props) => (
  <StyledMuiAlert elevation={6} variant="filled" {...props} />
);

const Wrapper = styled.div`
  height: 100%;
  background: papayawhip;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  & > * {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(2, 0)};
`;

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing(5, 5, 5, 5)};
  text-align: center;
`;

const Header = styled(Typography).attrs(() => ({
  component: 'h1',
  variant: 'h1',
  gutterBottom: true,
}))`
  margin: ${({ theme }) => theme.spacing(5, 5, 5, 5)};
`;

const StyledButton = styled(Button)`
  && {
    height: 3.2rem;
    border-radius: 24px;
    background: #e24f54;
    color: white;
  }
`;

const Login = () => {
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
    <Wrapper>
      <Header>Login</Header>
      <StyledCard>
        <Form method="post" onSubmit={submit}>
          <TextField
            required
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <TextField
            required
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            name="password"
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <ButtonWrapper>
            <StyledButton fullWidth variant="contained" type="submit">
              Login
            </StyledButton>
          </ButtonWrapper>
        </Form>

        {response && response.error && (
          <Alert severity="error">
            {response.error.message || 'Error loggin in.'}
          </Alert>
        )}

        <NextLink href="/signup">
          <Link margin="normal" variant="body2" href="/signup">
            Create account
          </Link>
        </NextLink>
      </StyledCard>
    </Wrapper>
  );
};

export default withAuth({
  WrappedComponent: Login,
  redirectTo: '/',
  shouldBeLoggedIn: false,
});
