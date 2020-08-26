import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import RenderField from 'components/RenderField';
import ButtonLink from 'components/ButtonLink';
import SweetAlert from 'sweetalert2-react';
import messages from './messages';
import LoginLogo from '../../images/login.png';
import { publicPath } from './constants';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
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
  loginFooter: {
    marginTop: theme.spacing(1),
  },
  loginTopic: {
    marginTop: theme.spacing(1),
  },
}));

const ImgLogo = styled.img`
  border: 1px solid #bbbbbb;
  padding: 10px;
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
  } = props;

  return (
    <Container component="main" maxWidth="xs">
      <SweetAlert
        show={errorLogin}
        title="Login Error"
        type="error"
        text={errorLogin}
        onConfirm={clearData}
      />
      <div className={classes.paper}>
        <ImgLogo src={LoginLogo} width="128" height="128" />
        <Typography variant="h5" className={classes.loginTopic}>
          <FormattedMessage {...messages.signIn} />
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Field
            name="email"
            component={RenderField}
            type="email"
            margin="normal"
            label={<FormattedMessage {...messages.email} />}
            required
            fullWidth
            autoFocus
          />
          <Field
            name="password"
            component={RenderField}
            type="password"
            label={<FormattedMessage {...messages.password} />}
            margin="normal"
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={pristine || submitting}
          >
            {<FormattedMessage {...messages.submit} />}
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={pristine || submitting}
            onClick={reset}
          >
            {<FormattedMessage {...messages.clear} />}
          </Button>
          <Grid container className={classes.loginFooter}>
            <Grid item xs={12} lg={4}>
              <ButtonLink color="purple" to={`${publicPath}/forgot-password`}>
                {<FormattedMessage {...messages.forgotPassword} />}
              </ButtonLink>
            </Grid>
            <Grid item xs={12} lg={8}>
              <ButtonLink color="purple" to={`${publicPath}/register`}>
                {<FormattedMessage {...messages.register} />}
              </ButtonLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

LoginForm.propTypes = {
  errorLogin: PropTypes.string,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  clearData: PropTypes.func,
};

const validate = formValues => {
  const errors = {};

  if (typeof formValues.email === 'undefined') {
    errors.email = <FormattedMessage {...messages.emailShouldNotEmpty} />;
  } else if (!formValues.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
    errors.email = <FormattedMessage {...messages.emailIncorrectPattern} />;
  }

  if (!formValues.password) {
    errors.password = <FormattedMessage {...messages.passwordShouldNotEmpty} />;
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);
