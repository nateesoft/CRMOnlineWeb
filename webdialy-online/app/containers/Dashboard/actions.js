/*
 *
 * Dashboard actions
 *
 */

import * as constants from './constants';

export function initState() {
  return {
    type: constants.INIT_STATE,
  };
}

export function loadRedeem(payload) {
  return {
    type: constants.LOAD_REDEEM,
    payload,
  };
}
export function loadRedeemSuccess(payload) {
  return {
    type: constants.LOAD_REDEEM_SUCCESS,
    payload,
  };
}
export function loadRedeemError(payload) {
  return {
    type: constants.LOAD_REDEEM_ERROR,
    payload,
  };
}

export function createRedeem(payload) {
  return {
    type: constants.CREATE_REDEEM,
    payload,
  };
}
export function createRedeemSuccess(payload) {
  return {
    type: constants.CREATE_REDEEM_SUCCESS,
    payload,
  };
}
export function createRedeemError(payload) {
  return {
    type: constants.CREATE_REDEEM_ERROR,
    payload,
  };
}

export function updatePromotionUse(payload) {
  return {
    type: constants.UPDATE_PROMOTION_USE,
    payload,
  };
}
export function updatePromotionUseSuccess(payload) {
  return {
    type: constants.UPDATE_PROMOTION_USE_SUCCESS,
    payload,
  };
}
export function updatePromotionUseError(payload) {
  return {
    type: constants.UPDATE_PROMOTION_USE_ERROR,
    payload,
  };
}

export function checkPromotionValid(payload) {
  return {
    type: constants.CHECK_PROMOTION_VALID,
    payload,
  };
}
export function checkPromotionValidSuccess(payload) {
  return {
    type: constants.CHECK_PROMOTION_VALID_SUCCESS,
    payload,
  };
}
export function checkPromotionValidError(payload) {
  return {
    type: constants.CHECK_PROMOTION_VALID_ERROR,
    payload,
  };
}
