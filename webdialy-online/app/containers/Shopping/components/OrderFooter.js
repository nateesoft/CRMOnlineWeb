import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { Grid } from '@material-ui/core';
import * as appConstants from 'containers/App/constants';
import ButtonLink from 'components/ButtonLink';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: '0',
    background: 'chocolate',
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  noItemCart: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '2px 2px gray',
  },
  shoppingBasket: {
    marginRight: '5px',
  },
  textItem: {
    marginRight: '10px',
  },
  cartNo: {
    background: 'yellow',
    padding: '5px',
    color: 'black',
  },
}));

export default function OrderFooter(props) {
  const classes = useStyles();
  const { cart } = props;

  if (Object.keys(cart).length === 0) {
    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.noItemCart}>ยังไม่มีรายการสั่งซื้อ</div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Grid container>
          <Grid item xs={12}>
            <ButtonLink
              to={`${appConstants.publicPath}/home/checkout-orders/${cart.cart_no}`}
              color="white"
            >
              <Grid container spacing={3}>
                <Grid item xs={3} justifyContent="left">
                  <div
                    style={{
                      padding: '5px',
                      background: 'white',
                      color: 'black',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      borderRadius: '5px',
                      textAlign: 'center',
                      verticalAlign: 'center',
                      width: '50px',
                    }}
                  >
                    {cart.total_item || 0}
                  </div>
                </Grid>
                <Grid item xs={6} justifyContent="center">
                  <div
                    style={{
                      padding: '5px',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    ตะกร้าของฉัน
                  </div>
                </Grid>
                <Grid item xs={3} justifyContent="right">
                  <div
                    style={{
                      padding: '5px',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    ฿{cart.total_amount || 0}
                  </div>
                </Grid>
              </Grid>
            </ButtonLink>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

OrderFooter.propTypes = {
  cart: PropTypes.object,
};
