import styled, { css } from 'styled-components';
import { Grid } from '@material-ui/core';

export const FlexGrowGrid = styled(Grid)`
  flex-grow: 1;
`;

export const SearchFieldWrapper = styled.div`
  margin: ${({ theme }) => css`${theme.spacing(4)}px 0`};
`;

export const SearchResultWrapper = styled(Grid).attrs({ spacing: 2, container: true })`
  
`;

export const SearchItemWrapper = styled(Grid).attrs({ item: true, xs: 12, sm: 6, md: 4, lg: 3 })`

`;
