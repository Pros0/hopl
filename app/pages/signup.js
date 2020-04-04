import React, { useState } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';

import { getGatewayUsers } from '../utils/gateways';
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

const SignUp = () => {
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
    <Wrapper>
      <Header>Buckle Your Pants!</Header>
      <StyledCard disabled={isSubmitting}>
        <Form onSubmit={submit}>
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
            label="First Name"
            variant="outlined"
            margin="normal"
            name="firstName"
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <TextField
            required
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            name="lastName"
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
            <StyledButton
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Sign up
            </StyledButton>
          </ButtonWrapper>
        </Form>

        {response && (
          <Alert severity={response.error ? 'error' : 'success'}>
            {response.error
              ? response.error.message
              : `User with email ${response.email} was successfully created!`}
          </Alert>
        )}

        <NextLink href="/login">
          <Link margin="normal" variant="body2" href="/login">
            Login
          </Link>
        </NextLink>
      </StyledCard>
    </Wrapper>
  );
};

export default withAuth({
  WrappedComponent: SignUp,
  redirectTo: '/',
  shouldBeLoggedIn: false,
});
