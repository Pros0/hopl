import styled, { css } from 'styled-components';
import { Grid, Typography } from '@material-ui/core';

export const SearchFieldWrapper = styled.div`
  margin-bottom: ${({ theme }) =>
    css`
      ${theme.spacing(4)}px
    `};
`;

export const SearchResultText = styled(Typography).attrs({
  variant: 'subtitle1',
})`
  font-style: italic;
  text-align: center;
  width: 100%;
`;

export const SearchResultWrapper = styled(Grid).attrs({
  spacing: 2,
  container: true,
})``;

export const SearchItemWrapper = styled(Grid).attrs({
  item: true,
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
})``;
