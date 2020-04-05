import React, { useState } from 'react';
import {
  Dialog,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import messages from './messages';

/**
 * TODO: WORK IN PROGRESS, USING STATIC DATA FOR NOW.
 */
const UserInformationModal = ({ open, user, onClose }) => {
  const { formatMessage } = useIntl();
  const [sent, hasSent] = useState(false);
  return (
    <Dialog open={open} onBackdropClick={onClose}>
      {sent ? (
        <>
          <DialogTitle>Message sent!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your massage has been sent to{' '}
              <b>
                {user.firstName} {user.lastName}
              </b>
              !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>
            {user.firstName} {user.lastName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hi! I am just here for the demo so dont mind me!
            </DialogContentText>
            <DialogContentText>
              <Typography variant="caption" display="block">
                COVID-19 status
              </Typography>
              <Typography variant="body1" gutterBottom>
                Dont know.
              </Typography>
              <Typography variant="caption" display="block">
                Drivers licence
              </Typography>
              <Typography variant="body1" gutterBottom>
                B - Car and light truck
              </Typography>
            </DialogContentText>
            <TextField
              fullWidth
              multiline
              rows="4"
              variant="outlined"
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => hasSent(true)} color="primary">
              {formatMessage(messages.createContact)}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default UserInformationModal;
