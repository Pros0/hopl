import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';
import { Form } from '../common/Form/styles';

export const UserForm = styled(Form)`
  ${({ theme }) => `
  justify-content: space-between;

  && > * {
    ${theme.breakpoints.up('sm')} {
        width: 49%;
    }
  }`}
`;

export const Card = styled(MuiCard)`
  padding: ${({ theme }) => theme.spacing(5, 5, 5, 5)};
  margin: ${({ theme }) => theme.spacing(3, 0, 5, 0)};
`;
