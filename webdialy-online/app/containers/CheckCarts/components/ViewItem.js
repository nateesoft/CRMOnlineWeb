import React, { useState } from 'react';
import { getCookie } from 'react-use-cookie';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode.react';
import SweetAlert from 'sweetalert2-react';
import * as appConstants from 'containers/App/constants';
import messages from './messages';
import { makeSelectForm } from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  loginTopic: {
    marginTop: theme.spacing(1),
  },
  divContent: {
    marginTop: '20px',
    marginBottom: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '10px',
  },
  likeText: {
    marginBottom: '2px',
    background: '#eee',
    borderRadius: '5px',
  },
  title: {
    marginTop: theme.spacing(2),
    background: 'blue',
    color: 'white',
    padding: '5px',
    width: '75vw',
  },
  paperShoppingStep: {
    padding: '20px',
    background: '#ddd',
    width: '75vw',
  },
  showQrCode: { border: '1px dashed #ccc', padding: '10px', marginTop: '10px' },
}));

const ViewItem = props => {
  const database = getCookie('database');
  const classes = useStyles();
  const [approve, setApprove] = useState('');
  const [reason, setReason] = useState('');
  const { showAlertResponse, onChangePage } = props;
  const {
    cart_no: cartNo,
    cart_create_date: cartCreateDate,
    member_code: memberCode,
    total_item: totalItem,
    total_amount: totalAmount,
    total_point: totalPoint,
    shopping_step: shoppingStep,
    cart_active: cartActive,
    slip_path: slipPath,
    total_transport_amt: totalTransportAmt,
  } = props.initialValues;

  const apiServiceHost = appConstants.apiUploadServiceHost;

  const updateStatus = () => {
    if (approve === 'not_approve' && reason === '') {
      return;
    }
    if (approve === '') {
      return;
    }
    if (approve !== '') {
      props.onUpdateShoppingStep({
        cart_no: cartNo,
        cart_create_date: cartCreateDate,
        approve,
        reason,
        member_code: memberCode,
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <SweetAlert
        show={showAlertResponse.status === 'Success'}
        title="Update Status"
        type="success"
        text="Approve Cart Status Success"
        onConfirm={() => onChangePage('LIST')}
      />
      <Typography variant="h6">
        <FormattedMessage {...messages.headerViewItem} />
      </Typography>
      <div align="center" className={classes.showQrCode}>
        <QRCode value={`/order_confirm/${cartNo}/${JSON.parse(database)}`} />
      </div>
      <Grid container spacing={1} className={classes.divContent}>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col1} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {cartNo}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col2} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {cartCreateDate}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col3} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {memberCode}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col4} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {totalItem}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col5} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {totalAmount}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col6} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {totalPoint}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col7} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {shoppingStep}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col8} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {cartActive}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col9} />
        </Grid>
        <Grid item xs={8} className={classes.likeText}>
          {totalTransportAmt}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            รูปภาพสลิปที่โอนเงินเข้าระบบ
          </Typography>
          <img src={`${apiServiceHost}${slipPath}`} width={250} alt="sample slip upload" />
        </Grid>
        <Grid item xs={6}>
          {shoppingStep && shoppingStep !== 'approve' && (
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Approve Slip</FormLabel>
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                  <FormControlLabel
                    value="approve"
                    control={<Radio color="primary" onChange={e => setApprove(e.target.value)} />}
                    label="Approve"
                  />
                  <FormControlLabel
                    value="not_approve"
                    control={<Radio color="primary" onChange={e => setApprove(e.target.value)} />}
                    label="Not Approve"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
        </Grid>
        {shoppingStep && shoppingStep !== 'approve' && (
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="standard-basic"
              label="เหตุผล หรือสาเหตุที่ไม่ผ่านการยืนยันอนุมัติ"
              disabled={approve !== 'not_approve'}
              required
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => props.onChangePage('LIST')}>
            <FormattedMessage {...messages.btnBack} />
          </Button>
        </Grid>
        {shoppingStep && shoppingStep !== 'approve' && (
          <Grid item xs={5}>
            <Button color="primary" fullWidth variant="contained" onClick={() => updateStatus()}>
              <FormattedMessage {...messages.btnApprove} />
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

ViewItem.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  onRegister: PropTypes.func,
  initialValues: PropTypes.object,
  onChangePage: PropTypes.func,
  showAlertResponse: PropTypes.bool,
  getData: PropTypes.func,
  onUpdateShoppingStep: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  initialValues: makeSelectForm(),
});

export default connect(mapStateToProps)(ViewItem);
