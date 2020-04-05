import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';

export const PageWrapper = styled.div`
  min-height: ${({ theme }) => theme.viewPortHeight || '100%'};
  background: ${({ theme }) => theme.palette.offBackground.main};
  background-image: ${({
    theme,
  }) => `radial-gradient(${theme.palette.offBackground.dark} 2px, transparent 1px),
  radial-gradient(${theme.palette.offBackground.dark} 1px, transparent 2px);`}
  background-size: 50px 50px;
  padding: ${({ theme }) => theme.spacing(1.5, 1.5, 1.5, 1.5)};
`;

export const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
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
