import React from 'react';
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
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import Covid19StatusSelector from 'components/Covid19StatusSelector';
import DriverLicenceSelector from 'components/DriverLicenceSelector';
import EducationAutocomplete from 'components/EducationAutocomplete';
import messages from './messages';

const FilterModal = ({ open, onClose }) => {
  const { formatMessage } = useIntl();
  return (
    <Dialog open={open} onBackdropClick={onClose}>
      <DialogTitle>{formatMessage(messages.addSearchProfile)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {formatMessage(messages.addSearchProfileInfo)}
        </DialogContentText>
        <FormControl fullWidth>
          <TextField fullWidth required label="Filter name" />
        </FormControl>
        <Covid19StatusSelector />
        <DriverLicenceSelector />
        <EducationAutocomplete />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {formatMessage(messages.saveSearchProfile)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FilterModal.propTypes = {
  open: bool,
  onClose: func,
};

export default FilterModal;
