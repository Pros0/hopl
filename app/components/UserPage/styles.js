import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';
import { Form } from '../common/Form/styles';

export const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 1.5, 0, 1.5)};
`;

export const UserForm = styled(Form)`
  ${({ theme }) => `
  justify-content: space-between;

  && > * {
    ${theme.breakpoints.up('sm')} {
        width: 49%;
    }
  }`}
`;

export const ButtonsWrapper = styled.div`
  && {
    width: 100%;
    flex-basis: 1;
    justify-content: flex-start;
    display: flex;
  }
  && > * {
    max-width: 120px;
    margin: ${({ theme }) => theme.spacing(2, 2, 2, 0)};
  }
`;

export const Card = styled(MuiCard)`
  padding: ${({ theme }) => theme.spacing(5, 5, 5, 5)};
  margin: ${({ theme }) => theme.spacing(3, 0, 5, 0)};
`;
