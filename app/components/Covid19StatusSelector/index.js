import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const Covid19Selector = () => {
  return <FormControl fullWidth>
  <InputLabel id="driver-licence-label">Covid-19 Status</InputLabel>
  <Select labelId="driver-licence-label">
    <MenuItem value={10}>Dosent matter</MenuItem>
    <MenuItem value={10}>Dont know</MenuItem>
    <MenuItem value={20}>Have Covid-19</MenuItem>
    <MenuItem value={30}>Have had Covid-19</MenuItem>
  </Select>
</FormControl>
}

export default Covid19Selector;