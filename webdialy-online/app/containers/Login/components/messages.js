/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Login container!',
  },
  enterUsername: {
    id: `${scope}.enterUsername`,
    defaultMessage: 'Username',
  },
  enterPassword: {
    id: `${scope}.enterPassword`,
    defaultMessage: 'Password',
  },
  usernameShouldNotEmpty: {
    id: `${scope}.usernameShouldNotEmpty`,
    defaultMessage: 'Username should not be blank.',
  },
  passwordShouldNotEmpty: {
    id: `${scope}.passwordShouldNotEmpty`,
    defaultMessage: 'Password should not be blank.',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Sign in',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Forgot password',
  },
  loginErrorMessage: {
    id: `${scope}.loginErrorMessage`,
    defaultMessage: 'Incorrect username or password.',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  clear: {
    id: `${scope}.clear`,
    defaultMessage: 'Clear',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: `Don't have an account? Sign Up`,
  },
  selectCompany: {
    id: `${scope}.selectCompany`,
    defaultMessage: `Change Company`,
  },
});
