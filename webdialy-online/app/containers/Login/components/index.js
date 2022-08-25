import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import RenderField from 'components/RenderField';
import SweetAlert from 'sweetalert2-react';
import { Box, Paper } from '@material-ui/core';
import { setCookie } from 'react-use-cookie';

import * as appConstants from 'containers/App/constants';
import LoginLogo from 'images/loginIcon.png';
import messages from './messages';
import LoginFooter from './LoginFooter';
import { useStyles } from './styles';

const Header = styled.div`
  padding: 20px;
  top: 0;
  width: 100%;
  text-align: center;
`;
const Footer = styled.div`
  padding: 20px;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

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
    company,
    history,
    database,
    token,
  } = props;

  const apiServiceHost = appConstants.apiUploadServiceHost;

  const onValidate = formValues => {
    onValidateLogin(formValues);
  };

  const resetDatabase = () => {
    setCookie('database', '');
    window.location.href = `${appConstants.publicPath}/login`;
  };

  if (!database) {
    history.push(`${appConstants.publicPath}/`);
  }

  if (token && database) {
    window.location.href = `${appConstants.publicPath}/home/dashboard`;
  }

  return (
    <div className={classes.root}>
      {company && (
        <Header>
          {company.img_path && (
            <div style={{ padding: '5px' }}>
              <img
                src={`${apiServiceHost}${company.img_path}`}
                alt="Company Profile"
                style={{ width: '100xp', height: '100px' }}
              />
            </div>
          )}
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{company.name}</div>
        </Header>
      )}
      <Box display="flex" justifyContent="center" alignItems="center">
        <SweetAlert
          show={errorLogin}
          title="Login Error"
          type="error"
          text={errorLogin}
          onConfirm={clearData}
        />
        <div style={{ minHeight: '750' }}>
          <div className={classes.header}>CRM ONLINE</div>
          <Paper elevation={3} className={classes.paper}>
            <ImgLogo src={LoginLogo} width="128" height="128" />
            <form onSubmit={handleSubmit(onValidate)}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={10} md={7}>
                  <Field
                    name="username"
                    component={RenderField}
                    type="text"
                    margin="normal"
                    label={<FormattedMessage {...messages.username} />}
                    required
                  />
                </Grid>
                <Grid item xs={10} md={7}>
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
                        variant="outlined"
                        color="primary"
                        disabled={pristine || submitting}
                      >
                        {<FormattedMessage {...messages.submit} />}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" disabled={pristine || submitting} onClick={reset}>
                        {<FormattedMessage {...messages.clear} />}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        disabled={pristine || submitting}
                        onClick={resetDatabase}
                      >
                        {<FormattedMessage {...messages.selectCompany} />}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <LoginFooter />
          </Paper>
        </div>
      </Box>
      <Footer>
        <div>
          Copyright@SOFTPOS.co,Ltd
          <a
            href="http://www.softpos.co.th"
            target="_blank"
            style={{ color: 'blue', textDecoration: 'none', marginLeft: '5px', fontWeight: 'bold' }}
          >
            SOFTPOS.CO.TH
          </a>
        </div>
        <div>
          <b>*** Call-center: 086-320-3877 ***</b>
        </div>
        <div>
          <u>Privacy Policy</u>
        </div>
      </Footer>
    </div>
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
  company: PropTypes.object,
  database: PropTypes.string,
  token: PropTypes.string,
  history: PropTypes.object,
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
  destroyOnUnmount: false,
})(LoginForm);
