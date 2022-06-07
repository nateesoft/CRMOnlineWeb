/*
 *
 * MainLayoutApp actions
 *
 */

import * as constants from './constants';

export function loadProfile() {
  return {
    type: constants.LOAD_PROFILE,
  };
}
export function loadProfileSuccess(payload) {
  return {
    type: constants.LOAD_PROFILE_SUCCESS,
    payload,
  };
}
export function loadProfileError(payload) {
  return {
    type: constants.LOAD_PROFILE_ERROR,
    payload,
  };
}

export function loadLeftMenu() {
  return {
    type: constants.LOAD_LEFT_MENU,
  };
}
export function loadLeftMenuSuccess(payload) {
  return {
    type: constants.LOAD_LEFT_MENU_SUCCESS,
    payload,
  };
}
export function loadLeftMenuError(payload) {
  return {
    type: constants.LOAD_LEFT_MENU_ERROR,
    payload,
  };
}
