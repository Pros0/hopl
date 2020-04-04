import styled, { css } from 'styled-components';
import { Grid, FormControl } from '@material-ui/core';

export const FlexGrowGrid = styled(Grid)`
  flex-grow: 1;
`;

export const FormControlSpacing = styled(FormControl)`
  && {
    margin: ${({ theme }) =>
      css`
        ${theme.spacing(2)}px 0
      `};
  }
`;
