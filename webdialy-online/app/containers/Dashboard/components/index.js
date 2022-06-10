import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import RedeemPage from './RedeemPage';
import MyQrCode from './MyQrCode';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '50px',
  },
}));

export default function DashboardContent(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <Grid item xs={12}>
        <MyQrCode {...props} />
      </Grid>
      <Grid item xs={12}>
        <RedeemPage {...props} />
      </Grid>
    </Grid>
  );
}

DashboardContent.propTypes = {
  onRefresh: PropTypes.func,
  email: PropTypes.string,
  login: PropTypes.object,
  profile: PropTypes.object,
};
