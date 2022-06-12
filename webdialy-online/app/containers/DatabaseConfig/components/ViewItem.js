import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import messages from './messages';
import { makeSelectForm } from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  loginTopic: {
    marginTop: theme.spacing(1),
  },
  divContent: {
    marginTop: '20px',
    marginBottom: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
  },
}));

const ViewItem = props => {
  const classes = useStyles();
  const { col1, col2, col3 } = props.initialValues;

  return (
    <Container maxWidth="lg">
      <Typography variant="h6">
        <FormattedMessage {...messages.headerViewItem} />
      </Typography>
      <Grid container spacing={2} className={classes.divContent}>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col1} />
        </Grid>
        <Grid item xs={6}>
          {col1}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col2} />
        </Grid>
        <Grid item xs={6}>
          {col2}
        </Grid>
        <Grid item xs={4}>
          <FormattedMessage {...messages.col3} />
        </Grid>
        <Grid item xs={6}>
          {col3}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" onClick={() => props.onChangePage('LIST')}>
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
  initialValues: makeSelectForm(),
});

export default connect(mapStateToProps)(ViewItem);
