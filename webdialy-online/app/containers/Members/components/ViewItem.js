import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import messages from './messages';
import * as selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '10px',
  },
  divContent: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  colTab: {
    background: '#eeeeee',
    fontWeight: 'bold',
    margin: '1px',
    paddingLeft: '15px',
  },
}));

const ViewItem = props => {
  const classes = useStyles();
  const {
    code,
    email,
    member_role: memberRole,
    first_name: firstName,
    last_name: lastName,
    total_score: totalScore,
    total_purchase: totalPurchase,
    mobile,
  } = props.initialValues;

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography color="textSecondary" variant="h6">
        <FormattedMessage {...messages.headerViewItem} />
      </Typography>
      <Grid container spacing={3} className={classes.divContent}>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.memberCode} />
        </Grid>
        <Grid item xs={7}>
          {code}
        </Grid>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.email} />
        </Grid>
        <Grid item xs={7}>
          {email}
        </Grid>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.role} />
        </Grid>
        <Grid item xs={7}>
          {memberRole}
        </Grid>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.name} />
        </Grid>
        <Grid item xs={7}>
          {firstName}
        </Grid>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.lastName} />
        </Grid>
        <Grid item xs={7}>
          {lastName}
        </Grid>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.totalScore} />
        </Grid>
        <Grid item xs={7}>
          {totalScore}
        </Grid>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.totalPurchase} />
        </Grid>
        <Grid item xs={7}>
          {totalPurchase}
        </Grid>
        <Grid item xs={3} className={classes.colTab}>
          <FormattedMessage {...messages.mobile} />
        </Grid>
        <Grid item xs={7}>
          {mobile}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={() => props.onChangePage('LIST')}>
            <FormattedMessage {...messages.btnBack} />
          </Button>
        </Grid>
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
};

const mapStateToProps = createStructuredSelector({
  initialValues: selectors.makeSelectForm(),
});

export default connect(mapStateToProps)(ViewItem);
