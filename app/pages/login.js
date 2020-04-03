import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const Login = () => (
  <Wrapper>
    <Header>Login</Header>
    <StyledCard>
      <Form>
        <TextField
          required
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
        />
        <ButtonWrapper>
          <StyledButton fullWidth variant="contained" type="submit">
            Login
          </StyledButton>
        </ButtonWrapper>
      </Form>

      <NextLink href="/signup">
        <Link margin="normal" variant="body2" href="/signup">
          Create account
        </Link>
      </NextLink>
    </StyledCard>
  </Wrapper>
);

export default Login;
