import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const PageWrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.palette.offBackground.main};
  background-image: ${({
    theme,
  }) => `radial-gradient(${theme.palette.offBackground.dark} 2px, transparent 1px),
  radial-gradient(${theme.palette.offBackground.dark} 1px, transparent 2px);`}
  background-size: 50px 50px;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: ${({ theme }) => theme.spacing(1.5, 1.5, 0.5, 1.5)};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  text-align: center;
  display: flex;
  flex-wrap: wrap;

  & > * {
    width: 100%;
  }
`;

export const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing(5, 5, 5, 5)};
  text-align: center;
  margin: ${({ theme }) => theme.spacing(3, 2, 5, 2)};
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

export const StyledButton = styled(Button).attrs(() => ({ color: 'primary' }))`
  && {
    margin: ${({ theme }) => theme.spacing(2, 0)};
  }
`;
