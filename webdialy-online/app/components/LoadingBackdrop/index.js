import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loading: {
    color: 'chocolate',
  },
}));

export default function LoadingBackdrop(props) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.open || true}>
      <CircularProgress className={classes.loading} />
    </Backdrop>
  );
}

LoadingBackdrop.propTypes = {
  open: PropTypes.bool,
};
