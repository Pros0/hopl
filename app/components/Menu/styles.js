import styled from 'styled-components';
import MuiToolbar from '@material-ui/core/Toolbar';
import DefaultLogo from '../Logo';

export const Logo = styled(DefaultLogo)`
  width: 52px;
`;

export const Toolbar = styled(MuiToolbar)`
  padding: ${({ theme }) => theme.spacing(1, 0, 1, 0)};
`;
