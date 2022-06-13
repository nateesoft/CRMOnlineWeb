import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import * as appConstants from 'containers/App/constants';
import ButtonLink from 'components/ButtonLink';
import RenderField from 'components/RenderField';
import DateInput from 'components/RenderField/DateInput';
import SelectField from 'components/RenderField/Select';
import SweetAlert from 'sweetalert2-react';
import styled from 'styled-components';
import RegisterLogo from 'images/register.png';
import messages from './messages';

const ImgLogo = styled.img`
  border: 0px solid #bbbbbb;
  border-radius: 5px 5px 5px 5px;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  textGreen: {
    color: 'green',
  },
}));

const RegisterForm = props => {
  const classes = useStyles();
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    onRegister,
    errorRegister,
    registerStatus,
    clearData,
  } = props;
  const onValidated = formValues => {
    onRegister(formValues);
  };

  RegisterForm.propTypes = {
    errorRegister: PropTypes.string,
    registerStatus: PropTypes.string,
    clearData: PropTypes.func,
  };

  return (
    <Container component="main" maxWidth="lg">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <SweetAlert show={errorRegister} title="Register Error" type="error" text={errorRegister} />
      <SweetAlert
        show={registerStatus === 'Success'}
        title="Register Success"
        type="success"
        text="You can login into system"
        onConfirm={clearData}
      />
      <div className={classes.paper}>
        <ImgLogo src={RegisterLogo} width="100" />
        <Typography variant="h5" className={classes.loginTopic}>
          <FormattedMessage {...messages.header} />
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3}>
              <Field
                name="prefix"
                component={SelectField}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.prefix} />}
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Field
                name="first_name"
                component={RenderField}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.firstName} />}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                name="last_name"
                component={RenderField}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.lastName} />}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                name="birthday"
                component={DateInput}
                type="date"
                margin="normal"
                label={<FormattedMessage {...messages.dateOfBirth} />}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                name="mobile"
                component={RenderField}
                type="number"
                margin="normal"
                label={<FormattedMessage {...messages.mobile} />}
                required
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <Field
                name="email"
                component={RenderField}
                type="email"
                margin="normal"
                label={<FormattedMessage {...messages.email} />}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                name="password"
                component={RenderField}
                type="password"
                label={<FormattedMessage {...messages.password} />}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                name="rePassword"
                component={RenderField}
                type="password"
                label={<FormattedMessage {...messages.rePassword} />}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <span className={classes.textGreen}>
                * กรุณาใส่ LINE ID เพื่อรับสิทธิพิเศษ และ โปรโมชั่นพิเศษเฉพาะสำหรับสมาชิกผ่านทาง
                ERIC KAYSER LINE OFFICIAL เท่านั้น
              </span>
              <Field
                name="line_id"
                component={RenderField}
                type="text"
                label={<FormattedMessage {...messages.lineId} />}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={pristine || submitting}
              >
                <FormattedMessage {...messages.btnRegister} />
              </Button>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Button
                fullWidth
                variant="contained"
                disabled={pristine || submitting}
                onClick={reset}
              >
                <FormattedMessage {...messages.btnClear} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ButtonLink to={`${appConstants.publicPath}/login`}>
                <FormattedMessage {...messages.backLogin} />
              </ButtonLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  onRegister: PropTypes.func,
};

const validate = formValues => {
  const errors = {};

  if (!formValues.prefix) {
    errors.prefix = <FormattedMessage {...messages.prefixShouldNotEmpty} />;
  }

  if (!formValues.first_name) {
    errors.first_name = <FormattedMessage {...messages.firstNameShouldNotEmpty} />;
  }
  if (!formValues.last_name) {
    errors.last_name = <FormattedMessage {...messages.lastNameShouldNotEmpty} />;
  }
  if (!formValues.mobile) {
    errors.mobile = <FormattedMessage {...messages.mobileShouldNotEmpty} />;
  }
  if (!formValues.birthday) {
    errors.birthday = <FormattedMessage {...messages.dateOfBirthShouldNotEmpty} />;
  }
  if (typeof formValues.email === 'undefined') {
    errors.email = <FormattedMessage {...messages.emailShouldNotEmpty} />;
  } else if (!formValues.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
    errors.email = <FormattedMessage {...messages.emailIncorrectPattern} />;
  }
  if (!formValues.password) {
    errors.password = <FormattedMessage {...messages.passwordShouldNotEmpty} />;
  }
  if (!formValues.rePassword) {
    errors.rePassword = <FormattedMessage {...messages.passwordShouldNotEmpty} />;
  }
  if (formValues.password !== formValues.rePassword) {
    errors.rePassword = <FormattedMessage {...messages.passwordConfirmShouldEqual} />;
  }

  return errors;
};

export default reduxForm({
  form: 'registerForm',
  validate,
})(RegisterForm);
