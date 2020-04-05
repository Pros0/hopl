import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';

export const Form = styled.form`
  text-align: center;
  display: flex;
  flex-wrap: wrap;

  && > * {
    width: 100%;
  }
`;

export const Card = styled(MuiCard)`
  padding: ${({ theme }) => theme.spacing(5, 5, 5, 5)};
  text-align: center;
  margin: ${({ theme }) => theme.spacing(3, 2, 5, 2)};
  && {
    max-width: 500px;
  }
`;

export const Title = styled(Typography).attrs(() => ({
  component: 'h1',
  variant: 'h2',
}))`
  margin: ${({ theme }) => theme.spacing(5, 5, 0, 5)};
  font-weight: 700;
`;

export const Subtitle = styled(Typography).attrs(() => ({
  component: 'h2',
  variant: 'subtitle1',
  gutterBottom: true,
}))``;

export const Button = styled(MuiButton).attrs(() => ({ color: 'primary' }))`
  && {
    margin: ${({ theme }) => theme.spacing(2, 0)};
  }
`;
