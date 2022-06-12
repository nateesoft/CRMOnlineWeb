import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import ButtonLink from 'components/ButtonLink';
import * as appConstant from 'containers/App/constants';
import ContentNotFound from 'components/ContentNotFound';
import GlobalAlert from 'components/GlobalAlert';
import SignatureForm from './SignatureForm';
import messages from './messages';
import * as selectors from '../selectors';

const useStyles = makeStyles(() => ({
  colRow: {
    whiteSpace: 'nowrap',
  },
  updateItemHeader: {
    padding: '10px',
    textAlign: 'center',
    background: '#eee',
  },
  divContainer: {
    padding: '10px',
  },
  paper1: {
    overflow: 'auto',
  },
  showSignature: {
    padding: '10px',
  },
  buttonAction: {
    marginTop: '10px',
  },
}));

const ViewItem = props => {
  const classes = useStyles();
  const { response } = props;
  const { orders, orders_detail: ordersDetail } = props.getOrderList;
  const [mobileNo, setMobileNo] = useState(null);
  const [imgSigUrl, setImgSigUrl] = useState(null);

  useEffect(() => {
    if (orders && orders.signature) {
      setMobileNo(orders.member_mobile);
    }
  }, []);

  const onConfirmRecieveOrder = () => {
    props.onConfirmOrder({
      order_no: orders.order_no,
      member_code_update: orders.member_code,
      member_remark: '',
      signature: imgSigUrl,
      order_status: 'member_approve',
      member_mobile: mobileNo,
    });
  };

  const onShowImageSignature = imgBase64 => {
    setImgSigUrl(imgBase64);
  };

  if (!orders) {
    return <ContentNotFound label={<FormattedMessage {...messages.notfoundOrder} />} />;
  }

  return (
    <div style={{ border: '1px solid #eee', padding: '10px', margin: '10px' }}>
      <Helmet>
        <title>Member Order Confirm</title>
      </Helmet>
      <GlobalAlert
        show={response.status === 'Success'}
        title="Confirm Status"
        type="success"
        text="ยืนยันการรับสินค้าเสร็จสมบูรณ์"
        onConfirm={() => props.history.goBack()}
      />
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Typography variant="h5" className={classes.updateItemHeader}>
              <FormattedMessage {...messages.headerViewItem} />
            </Typography>
            <Grid container spacing={2} className={classes.divContainer}>
              <Grid item xs={6}>
                <FormattedMessage {...messages.col1} />
              </Grid>
              <Grid item xs={6}>
                {orders.order_no}
              </Grid>
              <Grid item xs={6}>
                <FormattedMessage {...messages.col2} />
              </Grid>
              <Grid item xs={6}>
                {orders.member_code}
              </Grid>
              <Grid item xs={6}>
                <FormattedMessage {...messages.col3} />
              </Grid>
              <Grid item xs={6}>
                {moment(new Date(orders.cart_create_date)).format('DD/MM/YYYY HH:mm:ss')}
              </Grid>
              <Grid item xs={6}>
                <FormattedMessage {...messages.col6} />
              </Grid>
              <Grid item xs={6}>
                {moment(new Date(orders.transfer_date)).format('DD/MM/YYYY HH:mm:ss')}
              </Grid>
              <Grid item xs={6}>
                <FormattedMessage {...messages.col4} />
              </Grid>
              <Grid item xs={6}>
                {orders.total_item}
              </Grid>
              <Grid item xs={6}>
                <FormattedMessage {...messages.col5} />
              </Grid>
              <Grid item xs={6}>
                {orders.total_amount}
              </Grid>
              <Grid item xs={6}>
                <FormattedMessage {...messages.col7} />
              </Grid>
              <Grid item xs={6}>
                {orders.order_status}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.paper1}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.colRow}>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">PCode</TableCell>
                  <TableCell align="left">PName</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Unit</TableCell>
                  <TableCell align="right">QTY</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="left">Options</TableCell>
                  <TableCell align="left">S Text</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersDetail &&
                  ordersDetail.map((item, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item.uuid_index}
                      className={classes.colRow}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.product_code}</TableCell>
                      <TableCell align="left">{item.product_name}</TableCell>
                      <TableCell align="right">{item.product_price}</TableCell>
                      <TableCell align="center">{item.product_unit}</TableCell>
                      <TableCell align="right">{item.qty}</TableCell>
                      <TableCell align="right">{item.total_amount}</TableCell>
                      <TableCell align="center">{item.options}</TableCell>
                      <TableCell align="center">{item.special_text}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div>
            <Grid item xs={12} className={classes.divContainer}>
              {!orders.member_mobile && !orders.signature && (
                <TextField
                  label="Contact Mobile"
                  value={mobileNo}
                  onChange={e => setMobileNo(e.target.value)}
                />
              )}
              {orders.member_mobile && <span>Mobile: {orders.member_mobile}</span>}
            </Grid>
            {!orders.signature ? (
              <Grid item xs={12}>
                <SignatureForm {...props} onExit={data => onShowImageSignature(data)} />
              </Grid>
            ) : (
              <Grid item xs={6} className={classes.showSignature}>
                <h4>Signature:</h4>
                <img src={orders.signature} alt="show signature" />
              </Grid>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.buttonAction}>
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="flex-end">
            {orders.order_status !== 'member_approve' && (
              <Grid item>
                <Button variant="outlined" color="primary" onClick={() => onConfirmRecieveOrder()}>
                  <FormattedMessage {...messages.btnSave} />
                </Button>
              </Grid>
            )}
            <Grid item>
              <ButtonLink to={`${appConstant.publicPath}/login`}>
                <Button variant="outlined">
                  <FormattedMessage {...messages.btnBack} />
                </Button>
              </ButtonLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
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
  response: PropTypes.object,
  getOrderList: PropTypes.object,
  onConfirmOrder: PropTypes.func,
  history: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  initialValues: selectors.makeSelectData(),
});

export default connect(mapStateToProps)(ViewItem);
