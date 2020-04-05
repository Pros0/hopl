import styled from 'styled-components';
import { PageWrapper as DefaultPageWrapper } from '../common/NotLoggedIn/styles';
import {
  Title as DefaultTitle,
  Subtitle as DefaultSubtitle,
  Button as DefaultButton,
} from '../common/Form/styles';

export const PageWrapper = styled(DefaultPageWrapper)`
  background: ${({ theme }) => theme.palette.primary.light};
  background-image: ${({
    theme,
  }) => `radial-gradient(${theme.palette.primary.dark} 2px, transparent 1px),
  radial-gradient(${theme.palette.primary.dark} 1px, transparent 2px);`}
  background-size: 50px 50px;
`;

export const Title = styled(DefaultTitle)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const Subtitle = styled(DefaultSubtitle)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const Button = styled(DefaultButton).attrs(() => ({
  color: 'secondary',
}))``;
