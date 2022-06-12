import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import * as appConstants from 'containers/App/constants';
import ButtonLink from 'components/ButtonLink';
import Thanks from './images/thanks.jpg';

const useStyles = makeStyles(() => ({
  imageThank: {
    borderRadius: '15px',
  },
  textTopic: {
    border: '1px solid #eee',
    padding: '25px',
    marginTop: '10px',
  },
  cartBillNo: {
    background: 'yellow',
    color: 'black',
  },
  separateLine: {
    border: '1px solid #eee',
    marginBottom: '10px',
    marginTop: '10px',
  },
}));

export default function FinishOrder(props) {
  const classes = useStyles();
  const loc = window.location.href.split('/');
  const hostUrl = `${loc[0]}//${loc[2]}${appConstants.publicPath}`;
  return (
    <>
      <div align="center">
        <Typography variant="h5" gutterBottom>
          ขอบคุณสำหรับคำสั่งซื้อสินค้า
        </Typography>
        <img
          src={Thanks}
          width="270"
          height="150"
          alt="thank for your support"
          className={classes.imageThank}
        />
        <Typography variant="subtitle1" className={classes.textTopic}>
          เลขที่ใบสั่งซื้อสินค้า ของคุณคือ{' '}
          <span className={classes.cartBillNo}>#{props.currentCartNo}</span> <br />
          <QRCode value={`${hostUrl}/order_confirm/${props.currentCartNo}/${props.database}`} />
          <br />
          ทางเราจะตรวจสอบสลิปการโอนเงินของท่าน <br />
          และแจ้งผลการตรวจสอบภายใน 1-2 วันทำการ
          <br />
          ขอขอบคุณค่ะ
        </Typography>
        <Divider className={classes.separateLine} />
        <ButtonLink to={`${appConstants.publicPath}/home/shopping/new`}>
          <Button color="primary" variant="outlined">
            กลับหน้าสั่งสินค้า
          </Button>
        </ButtonLink>
      </div>
    </>
  );
}

FinishOrder.propTypes = {
  currentCartNo: PropTypes.string,
  database: PropTypes.string,
};
