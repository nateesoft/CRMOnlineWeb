import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QRCode from 'qrcode.react';
import * as appConstants from 'containers/App/constants';

const ShowQRCode = props => {
  const { onClose, open, cart: cartNo, db: database } = props;
  const loc = window.location.href.split('/');
  const hostUrl = `${loc[0]}//${loc[2]}${appConstants.publicPath}`;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">QR CODE</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <QRCode value={`${hostUrl}/order_confirm/${cartNo}/${JSON.parse(database)}`} />
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          <a href={`${hostUrl}/order_confirm/${cartNo}/${JSON.parse(database)}`} target="_blank">
            Load
          </a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShowQRCode.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  cart: PropTypes.string,
  db: PropTypes.string,
};

export default ShowQRCode;
