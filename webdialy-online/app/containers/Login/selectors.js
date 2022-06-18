import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

export const selectLogin = state => state.login || initialState;

export const makeSelectLogin = () =>
  createSelector(
    selectLogin,
    loginState => loginState.loginForm,
  );

export const makeSelectProfile = () =>
  createSelector(
    selectLogin,
    loginState => loginState.profile,
  );

export const makeLoginError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.error,
  );

export const makeSelectLoggedIn = () =>
  createSelector(
    selectLogin,
    loginState => loginState.loggedIn,
  );
export const makeSelectDatabase = () =>
  createSelector(
    selectLogin,
    loginState => loginState.queryDb,
  );
export const makeCompanyProfile = () =>
  createSelector(
    selectLogin,
    loginState => loginState.company,
  );
