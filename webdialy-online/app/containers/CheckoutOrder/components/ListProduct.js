import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import RemoveIcon from '@material-ui/icons/Delete';
import MinusIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import PlusIcon from '@material-ui/icons/AddCircleOutlined';
import IconButton from '@material-ui/core/IconButton';

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
  lineRed: {
    color: 'red',
  },
  textGreen: {
    color: 'green',
  },
}));

export default function ListProduct(props) {
  const classes = useStyles();
  const { carts, carts_detail: cartsDetail } = props.cartList;

  const handleDelete = productCode => {
    props.deleteItemCart(productCode);
  };
  const handleAdd = (productCode, qty) => {
    if (qty === 0) {
      handleDelete(productCode);
    } else {
      props.updateItemCart(productCode, qty);
    }
  };
  const handleRemove = (productCode, qty) => {
    if (qty === 0) {
      handleDelete(productCode);
    } else {
      props.updateItemCart(productCode, qty);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        รายการสินค้า
      </Typography>
      <Divider className={classes.separateLine} />
      <List disablePadding>
        {cartsDetail &&
          cartsDetail.map(product => (
            <ListItem className={classes.listItem} key={product.uuid_index}>
              <ListItemText
                primary={product.product_name}
                secondary={`${product.total_amount} บาท`}
              />
              <IconButton aria-label="delete" onClick={() => handleDelete(product.product_code)}>
                <RemoveIcon className={classes.lineRed} />
              </IconButton>
              <div>
                <IconButton
                  aria-label="Remove"
                  onClick={() => handleAdd(product.product_code, product.qty - 1)}
                >
                  <MinusIcon className={classes.lineRed} />
                </IconButton>
                {product.qty}
                <IconButton
                  aria-label="Add"
                  onClick={() => handleRemove(product.product_code, product.qty + 1)}
                >
                  <PlusIcon className={classes.textGreen} />
                </IconButton>
              </div>
            </ListItem>
          ))}
        <Divider className={classes.separateLine} />
        <ListItem className={classes.listItem}>
          <ListItemText primary="ยอดรวม" />
          <Typography variant="subtitle1" className={classes.total}>
            {carts && carts[0] && carts[0].total_amount}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}

ListProduct.propTypes = {
  cartList: PropTypes.object,
  deleteItemCart: PropTypes.func,
  updateItemCart: PropTypes.func,
};
