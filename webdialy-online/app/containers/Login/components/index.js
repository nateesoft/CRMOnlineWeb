import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import RenderField from 'components/RenderField';
import SweetAlert from 'sweetalert2-react';
import { Paper } from '@material-ui/core';

import LoginLogo from 'images/login.png';
import messages from './messages';
import LoginFooter from './LoginFooter';
import { useStyles } from './styles';

const ImgLogo = styled.img`
  padding-top: 20px;
  border-radius: 5px 25px 5px 25px;
`;

const LoginForm = props => {
  const classes = useStyles();
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    errorLogin,
    clearData,
    onValidateLogin,
  } = props;

  const onValidate = formValues => {
    onValidateLogin(formValues);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <SweetAlert
          show={errorLogin}
          title="Login Error"
          type="error"
          text={errorLogin}
          onConfirm={clearData}
        />
        <div className={classes.header}>CRM ONLINE</div>
        <Paper elevation={3} className={classes.paper}>
          <ImgLogo src={LoginLogo} width="128" height="128" />
          <form onSubmit={handleSubmit(onValidate)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Field
                  name="username"
                  component={RenderField}
                  type="text"
                  margin="normal"
                  label={<FormattedMessage {...messages.username} />}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  component={RenderField}
                  type="password"
                  label={<FormattedMessage {...messages.password} />}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <Button
                      id="btnSubmit"
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={pristine || submitting}
                    >
                      {<FormattedMessage {...messages.submit} />}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" disabled={pristine || submitting} onClick={reset}>
                      {<FormattedMessage {...messages.clear} />}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <LoginFooter />
        </Paper>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  errorLogin: PropTypes.string,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  clearData: PropTypes.func,
  onValidateLogin: PropTypes.func,
};

const validate = formValues => {
  const errors = {};
  if (!formValues.username || formValues.username.trim() === '') {
    errors.username = <FormattedMessage {...messages.usernameShouldNotEmpty} />;
  }
  if (!formValues.password) {
    errors.password = <FormattedMessage {...messages.passwordShouldNotEmpty} />;
  }
  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate,
  enableReinitialize: true,
})(LoginForm);
