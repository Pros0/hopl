import React from 'react';
import { useIntl } from 'react-intl';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { FormControlSpacing } from 'components/common/styles';
import driverLicences from './consts';
import messages from './messages';

const DriverLicenceSelector = () => {
  const { formatMessage } = useIntl();
  return (
    <FormControlSpacing>
      <FormGroup row>
        {driverLicences.map((licence) => (
          <FormControlLabel
            key={licence}
            control={<Checkbox value={licence} name={licence} />}
            label={`${licence} - ${formatMessage(messages[licence])}`}
          />
        ))}
      </FormGroup>
    </FormControlSpacing>
  );
};

export default DriverLicenceSelector;
