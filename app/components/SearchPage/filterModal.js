import React, { useState, useEffect } from 'react';
import { bool, func } from 'prop-types';
import {
  Dialog,
  TextField,
  Select,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import Covid19StatusSelector from 'components/Covid19StatusSelector';
import DriverLicenceSelector from 'components/DriverLicenceSelector';
import EducationAutocomplete from 'components/EducationAutocomplete';
import { FormControlSpacing } from 'components/common/styles';
import messages from './messages';

const FilterModal = ({ open, onClose, onChange }) => {
  const { formatMessage } = useIntl();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <Dialog open={open} onBackdropClick={onClose}>
      <DialogTitle>{formatMessage(messages.addSearchProfile)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {formatMessage(messages.addSearchProfileInfo)}
        </DialogContentText>
        <Covid19StatusSelector
          onChange={(covid) => setFilter({ ...filter, covid19: covid })}
          showDosentMatterOption
        />
        <DriverLicenceSelector
          onChange={(driver) => {
            setFilter({ ...filter, driverLicence: driver });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onChange(filter)} color="primary">
          {formatMessage(messages.saveSearchProfile)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FilterModal.propTypes = {
  open: bool,
  onClose: func,
  onChange: func,
};

export default FilterModal;
