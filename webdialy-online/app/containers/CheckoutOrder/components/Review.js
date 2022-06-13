import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  separateLine: {
    border: '1px solid #eee',
  },
  divBottom: {
    marginBottom: '25px',
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const { carts, carts_detail: cartsDetail } = props.cartList;
  const {
    member_prefix: memberPrefix,
    member_name: memberName,
    member_lastname: memberLastName,
    address1,
    address2,
    sub_district: subDistrict,
    district,
    province,
    postcode,
  } = props.shipping;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        สรุปยอดสั่งซื้อสินค้า และที่อยู่จัดส่ง
      </Typography>
      <Divider className={classes.separateLine} />
      <List disablePadding>
        {cartsDetail &&
          cartsDetail.map(product => (
            <ListItem className={classes.listItem} key={product.product_code}>
              <ListItemText primary={product.product_name} secondary={product.desc} />
              <Typography variant="body2">{product.total_amount}</Typography>
            </ListItem>
          ))}
        <Divider className={classes.separateLine} />
        <ListItem className={classes.listItem}>
          <ListItemText primary="ค่าจัดส่ง" />
          <Typography variant="subtitle1" className={classes.total}>
            {carts && carts[0] && carts[0].total_transport_amt}
          </Typography>
        </ListItem>
        <Divider className={classes.separateLine} />
        <ListItem className={classes.listItem}>
          <ListItemText primary="ยอดรวมสินค้า" />
          <Typography variant="subtitle1" className={classes.total}>
            {carts && carts[0] && carts[0].total_net_amt}
          </Typography>
        </ListItem>
      </List>
      <Divider className={classes.separateLine} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            ที่อยู่สำหรับจัดส่ง
          </Typography>
          <Typography gutterBottom>{`${memberPrefix}${memberName} ${memberLastName}`}</Typography>
          <Typography gutterBottom>{`${address1} ${address2 ||
            ''} ${subDistrict} ${district} ${province} ${postcode}`}</Typography>
        </Grid>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

Review.propTypes = {
  cartList: PropTypes.object,
  shipping: PropTypes.object,
};
