import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { makeStyles } from '@material-ui/core/styles';
import RenderField from 'components/RenderField';
import { Typography } from '@material-ui/core';
import messages from './messages';
import * as selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginTopic: {
    marginTop: theme.spacing(1),
  },
}));

const EditItem = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting, response } = props;

  const onValidated = formValues => {
    props.onUpdateItem(formValues);
  };

  const clearData = () => {
    props.onInitLoad();
    props.onChangePage('LIST');
  };

  return (
    <Container maxWidth="lg">
      <SweetAlert
        show={response.status === 'Success'}
        title="Success"
        type="success"
        text={response.message}
        onConfirm={clearData}
      />
      <SweetAlert
        show={response.status === 'Error'}
        title="Error"
        type="error"
        text={response.message}
      />
      <Typography variant="h6">
        <FormattedMessage {...messages.headerEditItem} />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Field
              name="col1"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col1} />}
              required
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Field
              name="col2"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col2} />}
              required
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Field
              name="col3"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col3} />}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} lg={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
            >
              <FormattedMessage {...messages.btnSave} />
            </Button>
          </Grid>
          <Grid item xs={4} lg={3}>
            <Button fullWidth variant="contained" disabled={pristine || submitting} onClick={reset}>
              <FormattedMessage {...messages.btnReset} />
            </Button>
          </Grid>
          <Grid item xs={4} lg={3}>
            <Button fullWidth variant="contained" onClick={() => props.onChangePage('LIST')}>
              <FormattedMessage {...messages.btnBack} />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

EditItem.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  onRegister: PropTypes.func,
  initialValues: PropTypes.object,
  response: PropTypes.object,
  onUpdateItem: PropTypes.func,
  onInitLoad: PropTypes.func,
  onChangePage: PropTypes.func,
};

const validate = formValues => {
  const errors = {};
  if (!formValues.col1) {
    errors.col1 = <FormattedMessage {...messages.col1ShouldNotEmpty} />;
  }
  if (!formValues.col2) {
    errors.col2 = <FormattedMessage {...messages.col2ShouldNotEmpty} />;
  }
  if (!formValues.col3) {
    errors.col3 = <FormattedMessage {...messages.col3ShouldNotEmpty} />;
  }
  return errors;
};

const mapStateToProps = createStructuredSelector({
  initialValues: selectors.makeSelectForm(),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'editItem',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditItem),
);
