/*
 *
 * Login actions
 *
 */

import * as constants from './constants';

export function initDatabase(payload) {
  return {
    type: constants.INIT_DATABASE,
    payload,
  };
}

export function loadCompanySuccess(payload) {
  return {
    type: constants.LOAD_COMPANY_SUCCESS,
    payload,
  };
}

export function loadCompanyError(payload) {
  return {
    type: constants.LOAD_COMPANY_ERROR,
    payload,
  };
}

export function initState() {
  return {
    type: constants.INIT_STATE,
  };
}

export function clearLogin() {
  return {
    type: constants.CLEAR_LOGIN,
  };
}

export function checkLogin(payload) {
  return {
    type: constants.CHECK_LOGIN,
    payload,
  };
}

export function checkLoginSuccess(payload) {
  return {
    type: constants.CHECK_LOGIN_SUCCESS,
    payload,
  };
}

export function checkLoginError(payload) {
  return {
    type: constants.CHECK_LOGIN_ERROR,
    payload,
  };
}

export function checkLogout() {
  return {
    type: constants.CHECK_LOGOUT,
  };
}

export function checkLogoutSuccess() {
  return {
    type: constants.CHECK_LOGOUT_SUCCESS,
  };
}

export function checkLogoutError(payload) {
  return {
    type: constants.CHECK_LOGOUT_ERROR,
    payload,
  };
}

export function loadProfileFromToken(payload) {
  return {
    type: constants.LOAD_PROFILE_TOKEN,
    payload,
  };
}
