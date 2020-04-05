import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import styled from 'styled-components';

const StyledMuiAlert = styled(MuiAlert)`
  margin-bottom: 2rem;
`;
const Alert = (props) => (
  <StyledMuiAlert elevation={6} variant="filled" {...props} />
);

export default Alert;
