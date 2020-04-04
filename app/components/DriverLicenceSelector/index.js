import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const DriverLicenceSelector = () => {
  return <FormControl fullWidth>
  <InputLabel id="driver-licence-label">Drivers licence</InputLabel>
  <Select labelId="driver-licence-label">
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
}

export default DriverLicenceSelector;