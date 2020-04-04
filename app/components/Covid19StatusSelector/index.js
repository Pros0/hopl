import React from 'react';
import { useIntl } from 'react-intl';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {
  DOSENT_MATTER,
  DONT_KNOW,
  HAVE_COVID19,
  HAVE_HAD_COVID19,
} from './consts';
import messages from './messages';

const Covid19Selector = () => {
  const { formatMessage } = useIntl();
  return (
    <FormControl fullWidth>
      <InputLabel id="covid19-select-label">
        {formatMessage(messages.selectTitle)}
      </InputLabel>
      <Select labelId="covid19-select-label">
        <MenuItem value={DOSENT_MATTER}>
          {formatMessage(messages.dosentMatter)}
        </MenuItem>
        <MenuItem value={DONT_KNOW}>
          {formatMessage(messages.dontKnow)}
        </MenuItem>
        <MenuItem value={HAVE_COVID19}>
          {formatMessage(messages.haveCovid19)}
        </MenuItem>
        <MenuItem value={HAVE_HAD_COVID19}>
          {formatMessage(messages.havehadCovid19)}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Covid19Selector;
