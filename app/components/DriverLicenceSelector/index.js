import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
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

const DriverLicenceSelector = ({ onChange }) => {
  const { formatMessage } = useIntl();
  const [selectedLicences, setSelectedLicences] = useState([]);

  useEffect(() => {
    onChange(selectedLicences);
  }, [selectedLicences]);

  return (
    <FormControlSpacing>
      <FormGroup row>
        {driverLicences.map((licence) => (
          <FormControlLabel
            key={licence}
            control={
              <Checkbox
                onChange={(e) => {
                  const licenceValue = event.target.value;
                  const removedSelectedLicences = selectedLicences.filter(
                    (l) => l !== licenceValue,
                  );
                  const { checked } = event.target;
                  checked
                    ? setSelectedLicences([...selectedLicences, licenceValue])
                    : setSelectedLicences(removedSelectedLicences);
                }}
                value={licence}
                name={licence}
              />
            }
            label={`${licence} - ${formatMessage(messages[licence])}`}
          />
        ))}
      </FormGroup>
    </FormControlSpacing>
  );
};

DriverLicenceSelector.propTypes = {
  onChange: func,
};

export default DriverLicenceSelector;
