import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import RenderField from 'components/RenderField';
import SweetAlert from 'sweetalert2-react';
import { Helmet } from 'react-helmet';

import * as appConstants from 'containers/App/constants';
import ButtonLink from 'components/ButtonLink';
import messages from './messages';

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
  container: {
    marginBottom: '50px',
    padding: '10px',
  },
}));

const EditForm = props => {
  const classes = useStyles();
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    onEditMember,
    errorUpdate,
    updateStatus,
    clearData,
  } = props;

  const onValidated = formValues => {
    const { mobile, email, new_password: newPassword } = formValues;
    onEditMember({ mobile, email, new_password: newPassword });
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Helmet>
        <title>เปลี่ยนรหัสผ่าน</title>
      </Helmet>
      <SweetAlert show={errorUpdate} title="Update data error" type="error" text={errorUpdate} />
      <SweetAlert
        show={updateStatus === 'Success'}
        title="Update data success"
        type="success"
        text="Back to profile detail"
        onConfirm={clearData}
      />
      <Typography variant="h5" className={classes.loginTopic}>
        <FormattedMessage {...messages.header} />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Field
              name="email"
              component={RenderField}
              type="email"
              margin="normal"
              label={<FormattedMessage {...messages.email} />}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name="mobile"
              component={RenderField}
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.mobile} />}
              disabled
            />
          </Grid>
          <Grid item>
            <Field
              name="old_password"
              component={RenderField}
              type="password"
              margin="normal"
              label={<FormattedMessage {...messages.oldPassword} />}
            />
          </Grid>
          <Grid item>
            <Field
              name="new_password"
              component={RenderField}
              type="password"
              margin="normal"
              label={<FormattedMessage {...messages.newPassword} />}
            />
          </Grid>
          <Grid item>
            <Field
              name="confirm_password"
              component={RenderField}
              type="password"
              margin="normal"
              label={<FormattedMessage {...messages.confirmPassword} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={pristine || submitting}
            >
              <FormattedMessage {...messages.btnSaveProfile} />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" disabled={pristine || submitting} onClick={reset}>
              <FormattedMessage {...messages.btnResetForm} />
            </Button>
          </Grid>
          <Grid item>
            <ButtonLink to={`${appConstants.publicPath}/home/profile`}>
              <Button variant="outlined" onClick={reset}>
                <FormattedMessage {...messages.btnBack} />
              </Button>
            </ButtonLink>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

EditForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  onRegister: PropTypes.func,
  initialValues: PropTypes.object,
  errorUpdate: PropTypes.string,
  updateStatus: PropTypes.string,
  clearData: PropTypes.func,
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.any,
  children: PropTypes.any,
  onEditMember: PropTypes.func,
  touched: PropTypes.any,
  error: PropTypes.any,
};

const validate = formValues => {
  const errors = {};

  if (!formValues.old_password) {
    errors.old_password = <FormattedMessage {...messages.oldPasswordShouldNotEmpty} />;
  }

  if (!formValues.new_password) {
    errors.new_password = <FormattedMessage {...messages.newPasswordShouldNotEmpty} />;
  }
  if (!formValues.confirm_password) {
    errors.confirm_password = <FormattedMessage {...messages.confirmPasswordShouldNotEmpty} />;
  }
  if (formValues.new_password !== formValues.confirm_password) {
    errors.confirm_password = <FormattedMessage {...messages.newPassAndConfirmPassShouldBeMatch} />;
  }

  return errors;
};

export default reduxForm({
  form: 'editForm',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(EditForm);
