import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import * as appConstants from 'containers/App/constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    background: 'white',
    border: '0px',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textBlack: {
    color: 'black',
  },
  separateLine: {
    border: '1px solid #eee',
  },
  buttonMinus: {
    background: 'red',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  textInputQty: {
    border: '0px solid #eee',
    width: '100px',
    height: '35px',
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  buttonAdd: {
    background: 'green',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  textSpecial: {
    width: '100%',
  },
  buttonSave: {
    background: '#76bd5f',
    color: 'white',
    width: '80%',
  },
}));

export default function DialogDetail(props) {
  const { open, handleClose, Transition, item, profile, cart } = props;
  const [qty, setQty] = useState(1);
  const [options, setOptions] = useState('');
  const [specialText, setSpecialText] = useState('');
  const classes = useStyles();

  const apiServiceHost = appConstants.serviceApiPath;

  const handleCloseDialog = () => {
    handleClose();
    setQty(1);
  };

  const saveCartItem = () => {
    if (cart && cart.cart_no) {
      props.onUpdateCartItem({
        ...item,
        qty,
        options,
        special_text: specialText,
        total_amount: item.price_d * qty,
        point_total: item.point * qty,
        member_code: profile.code,
        cart_no: cart.cart_no,
      });
    } else {
      props.onAddCartItem({
        ...item,
        qty,
        options,
        special_text: specialText,
        total_amount: item.price_d * qty,
        point_total: item.point * qty,
        member_code: profile.code,
      });
    }
    handleCloseDialog();
  };

  const handleQty = qtyAmt => {
    setQty(qtyAmt);
  };

  const addQty = qtyAmt => {
    setQty(qtyAmt + 1);
    if (item.qty_over_stock === 'N') {
      if (item.in_stock && qtyAmt + 1 > item.in_stock) {
        setQty(item.in_stock);
      }
    }
  };
  const minusQty = qtyAmt => {
    setQty(qtyAmt - 1);
    if (qtyAmt - 1 < 1) {
      setQty(1);
    }
  };

  DialogDetail.propTypes = {
    open: PropTypes.any,
    handleClose: PropTypes.func,
    Transition: PropTypes.any,
    item: PropTypes.object,
    profile: PropTypes.object,
    cart: PropTypes.object,
    onUpdateCartItem: PropTypes.func,
    onAddCartItem: PropTypes.func,
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => handleCloseDialog()}
      TransitionComponent={Transition}
    >
      <Toolbar>
        <Typography variant="h6" className={classes.title} />
        <IconButton
          edge="start"
          onClick={() => handleCloseDialog()}
          aria-label="close"
          className={classes.textBlack}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Typography align="center">
        {item.img_path && <img src={`${apiServiceHost}${item.img_path}`} width="250" alt="" />}
        {options && <div>options: {options}</div>}
        {specialText && <div>special_text: {specialText}</div>}
      </Typography>
      <List>
        <ListItem button>
          <ListItemText primary={item.name} secondary={`ราคา ${item.price_d} บาท`} />
        </ListItem>
        <Divider className={classes.separateLine} />
        <ListItem button>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
              value={options}
              onChange={e => setOptions(e.target.value)}
            >
              <FormControlLabel value="" control={<Radio color="primary" />} label="No option" />
              <FormControlLabel value="opt1" control={<Radio color="primary" />} label="Option 1" />
              <FormControlLabel value="opt2" control={<Radio color="primary" />} label="Option 2" />
            </RadioGroup>
          </FormControl>
        </ListItem>
        <Divider className={classes.separateLine} />
        <ListItem>
          <TextField
            id="standard-basic"
            label="ข้อความพิเศษ"
            className={classes.textSpecial}
            value={specialText}
            onChange={e => setSpecialText(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              <Typography align="right">
                <Button
                  variant="outlined"
                  style={{
                    background: 'red',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => minusQty(qty)}
                >
                  -
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography align="center">
                <input
                  type="number"
                  value={qty || 1}
                  onChange={e => handleQty(e.target.value)}
                  style={{
                    border: '0px solid #eee',
                    width: '100px',
                    height: '35px',
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: 'bold',
                  }}
                />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography align="left">
                <Button
                  variant="outlined"
                  style={{
                    background: 'green',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => addQty(qty)}
                >
                  +
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={12}>
              <Typography align="center">
                <Button
                  style={{
                    background: '#76bd5f',
                    color: 'white',
                    width: '80%',
                  }}
                  onClick={() => saveCartItem()}
                >
                  ใส่ตะกร้า {qty} รายการ = {item.price_d * qty} บาท
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Dialog>
  );
}
