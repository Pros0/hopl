import React from 'react';
import { bool, func } from 'prop-types';
import { useIntl } from 'react-intl';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { FormControlSpacing } from 'components/common/styles';
import {
  DOSENT_MATTER_OR_KNOW,
  HAVE_COVID19,
  HAVE_HAD_COVID19,
} from './consts';
import messages from './messages';

const Covid19Selector = ({ showDosentMatterOption, onChange }) => {
  const { formatMessage } = useIntl();
  return (
    <FormControlSpacing fullWidth>
      <InputLabel id="covid19-select-label">
        {formatMessage(messages.selectTitle)}
      </InputLabel>
      <Select
        labelId="covid19-select-label"
        defaultValue={DOSENT_MATTER_OR_KNOW}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value={DOSENT_MATTER_OR_KNOW}>
          {showDosentMatterOption
            ? formatMessage(messages.dosentMatter)
            : formatMessage(messages.dontKnow)}
        </MenuItem>
        <MenuItem value={HAVE_COVID19}>
          {formatMessage(messages.haveCovid19)}
        </MenuItem>
        <MenuItem value={HAVE_HAD_COVID19}>
          {formatMessage(messages.havehadCovid19)}
        </MenuItem>
      </Select>
    </FormControlSpacing>
  );
};

Covid19Selector.propTypes = {
  showDosentMatterOption: bool,
  onChange: func,
};

export default Covid19Selector;
