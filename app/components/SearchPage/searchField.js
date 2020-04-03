import React from 'react';
import { TextField, Grid, Container } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import { useIntl } from 'react-intl';
import messages from './messages';
import { FlexGrowGrid } from './styled';

const SearchField = () => {
  const { formatMessage } = useIntl();
  return <Grid container spacing={1} alignItems="flex-end">
  <Grid item>
    <LocationOn />
  </Grid>
  <FlexGrowGrid item>
    <TextField fullWidth label={formatMessage(messages.searchPlaceHolder)} />
  </FlexGrowGrid>
</Grid>
}

export default SearchField;