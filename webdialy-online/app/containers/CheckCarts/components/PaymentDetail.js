import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    background: 'chocolate',
    color: 'white',
    padding: '5px',
    width: '75vw',
  },
}));

export default function PaymentDetail(props) {
  const classes = useStyles();
  if (props.payment) {
    const { payment } = props;
    return (
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom className={classes.title}>
          รายละเอียดการชำระเงิน
        </Typography>
        <Grid container>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>ประเภทรับชำระ</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>เงินโอน</Typography>
            </Grid>
          </>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>บัญชีต้นทาง</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.account_from_name}</Typography>
            </Grid>
          </>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>เลขที่บัญชีต้นทาง</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.from_account_no}</Typography>
            </Grid>
          </>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>ชื่อบัญชีปลายทาง</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.account_to_name}</Typography>
            </Grid>
          </>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>เลขที่บัญชีปลายทาง</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.to_account_no}</Typography>
            </Grid>
          </>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>เลขที่อ้างอิงการโอนเงิน</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.transfer_ref}</Typography>
            </Grid>
          </>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>จำนวนเงินที่โอน</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.transfer_amount}</Typography>
            </Grid>
          </>
          <>
            <Grid item xs={6}>
              <Typography gutterBottom>วันที่/เวลา ที่โอนเงิน</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.transfer_date}</Typography>
            </Grid>
          </>
        </Grid>
      </Grid>
    );
  }

  PaymentDetail.propTypes = {
    payment: PropTypes.object,
  };

  return <div>Not found payment detail</div>;
}
