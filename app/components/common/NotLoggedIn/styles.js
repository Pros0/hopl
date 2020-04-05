import styled from 'styled-components';

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
