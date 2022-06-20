/*
 *
 * ProfileChangePwd actions
 *
 */

import * as constants from './constants';

export function initState() {
  return {
    type: constants.INIT_STATE,
  };
}

export function logout() {
  return {
    type: constants.LOGOUT,
  };
}

export function updatePassword(payload) {
  return {
    type: constants.UPDATE_PASSWORD,
    payload,
  };
}

export function updatePasswordSuccess() {
  return {
    type: constants.UPDATE_PASSWORD_SUCCESS,
  };
}

export function updatePasswordError(payload) {
  return {
    type: constants.UPDATE_PASSWORD_ERROR,
    payload,
  };
}
