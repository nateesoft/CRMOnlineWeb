import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Paper } from '@material-ui/core';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import * as appConstants from 'containers/App/constants';
import MapDirectionAB from 'containers/GoogleMap/components/MapDirectionAB';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  separateLine: {
    border: '1px solid #eee',
  },
  buttonRight: {
    marginRight: '10px',
  },
  buttonValidate: {
    background: 'chocolate',
  },
}));

const PaymentForm = props => {
  const classes = useStyles();
  const { carts } = props.cartList;
  const { file } = props;
  const { map_latitude: branchLatitude, map_longitude: branchLongitude } = props.branch;
  const { map_latitude: customerLatitude, map_longitude: customerLongitude } = props.shipping;

  const onChangeHandler = event =>
    new Promise((resolve, reject) => {
      const sourceFile = event.target.files[0];
      // const fileName = event.target.files[0].name;

      props.setShowImg(false);
      props.setFile(sourceFile);

      props.onUploadImage(sourceFile);
      props.setShowImg(true);

      // props.checkSlipImage(fileName);
      // props.onUpdateSlipPath(fileName);

      resolve(true);
    });

  const apiServiceHost = appConstants.serviceApiPath;

  const origin = {
    position: {
      lat: () => branchLatitude,
      lng: () => branchLongitude,
    },
  };

  const destination = {
    position: {
      lat: () => customerLatitude,
      lng: () => customerLongitude,
    },
  };

  const handleDirection = (distance, duration) => {
    props.setDistance(distance / 1000);
    props.setDuration(duration / 60);

    // update transport amount
    props.onUpdateTransportAmount(distance / 1000);
  };

  return (
    <React.Fragment>
      {customerLatitude && branchLatitude && (
        <Grid container>
          <Grid item xs={12}>
            <div align="center" className={classes.divBottom}>
              <MapDirectionAB origin={origin} destination={destination} onExit={handleDirection} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div align="center" className={classes.divBottom}>
              ระยะทาง {props.distance.toFixed(2)} กิโลเมตร
              <br />
              ระยะเวลา {props.duration.toFixed(2)} นาที
            </div>
          </Grid>
        </Grid>
      )}

      {carts && carts[0] && (
        <Typography variant="h6" gutterBottom>
          ยอดรับชำระ: จำนวน {carts[0].total_amount} + ค่าจัดส่ง{' '}
          {carts[0].total_transport_amt ? carts[0].total_transport_amt : 0} ={' '}
          {carts[0].total_net_amt} บาท
        </Typography>
      )}
      <Divider className={classes.separateLine} />
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            อัพโหลดไฟล์ Slip / Validate <input type="file" name="file" onChange={onChangeHandler} />
          </Grid>
          <Grid item xs={12}>
            {props.showImg && (
              <div align="center">
                <img src={`${apiServiceHost}/images/${file.name}`} width={150} alt="" />
                <br />
                <br />
                รูปสลิปที่โอนเงิน
                <br />
              </div>
            )}
          </Grid>
          <Grid item xs={6} lg={6}>
            {props.imgValid === 'Success' && (
              <Alert severity="success">ตรวจพบข้อมูล qrcode สำหรับรายการโอนเงิน</Alert>
            )}
            {props.imgValid === 'Warning' && (
              <Alert severity="error">ข้อมูลใน QR Code ไม่ถูกต้องตาม Format</Alert>
            )}
            {props.imgValid === 'Error' && (
              <Alert severity="error">ไฟล์ที่อัพโหลดไม่พบข้อมูล qrcode ในการโอนเงิน</Alert>
            )}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

PaymentForm.propTypes = {
  cartList: PropTypes.object,
  file: PropTypes.any,
  checkSlipImage: PropTypes.func,
  onUpdateSlipPath: PropTypes.func,
  setShowImg: PropTypes.func,
  setFile: PropTypes.func,
  onUploadImage: PropTypes.func,
  showImg: PropTypes.bool,
  imgValid: PropTypes.string,
  branch: PropTypes.string,
  shipping: PropTypes.string,
  setDistance: PropTypes.func,
  setDuration: PropTypes.func,
  onUpdateTransportAmount: PropTypes.func,
  distance: PropTypes.number,
  duration: PropTypes.number,
};

const validate = formValues => {
  const errors = {};
  if (!formValues.account_from_name) {
    errors.account_from_name = <FormattedMessage {...messages.accFromNameShouldNotEmpty} />;
  }
  if (!formValues.account_to_name) {
    errors.account_to_name = <FormattedMessage {...messages.accToNameShouldNotEmpty} />;
  }
  if (!formValues.from_account_no) {
    errors.from_account_no = <FormattedMessage {...messages.fromAccShouldNotEmpty} />;
  }
  if (!formValues.to_account_no) {
    errors.to_account_no = <FormattedMessage {...messages.toAccShouldNotEmpty} />;
  }
  if (!formValues.transfer_date) {
    errors.transfer_date = <FormattedMessage {...messages.transferDateShouldNotEmpty} />;
  }
  if (!formValues.transfer_ref) {
    errors.transfer_ref = <FormattedMessage {...messages.transferRefShouldNotEmpty} />;
  }
  if (!formValues.transfer_amount) {
    errors.transfer_amount = <FormattedMessage {...messages.transferAmtShouldNotEmpty} />;
  }
  if (formValues.transfer_amount < 1) {
    errors.transfer_amount = <FormattedMessage {...messages.transferAmtShouldMoreZero} />;
  }
  return errors;
};

export default reduxForm({
  form: 'paymentForm',
  validate,
})(PaymentForm);
