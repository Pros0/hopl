import React, { useState } from 'react';
import { Container, Grid, InputLabel, Select, MenuItem, Button, FormControl } from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';
import { useIntl } from 'react-intl';
import messages from './messages';

const SearchProfile = () => {
  const { formatMessage } = useIntl();
  const [selectedProfile, setSelected] = useState('');
  return <Grid container alignItems="center" spacing={1}>
    <Grid item>
      <FilterList />
    </Grid>
    <Grid item xs={6} sm={4} md={3}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{formatMessage(messages.searchProfileSelectPlaceholder)}</InputLabel>
        <Select 
          labelId="select-label"
          value={selectedProfile} 
          onChange={e => setSelected(e.target.value)}>
          <MenuItem disabled value=''>
            <em>derp</em>
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <Button>{formatMessage(messages.addSearchProfile)}</Button>
    </Grid>
  </Grid>
}

export default SearchProfile;