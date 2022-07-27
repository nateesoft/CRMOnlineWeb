/*
 *
 * Checkout actions
 *
 */

import * as constants from './constants';

export function initState() {
  return {
    type: constants.INIT_STATE,
  };
}
export function loadCart(payload) {
  return {
    type: constants.LOAD_CART,
    payload,
  };
}
export function loadCartSuccess(payload) {
  return {
    type: constants.LOAD_CART_SUCCESS,
    payload,
  };
}
export function loadCartError(payload) {
  return {
    type: constants.LOAD_CART_ERROR,
    payload,
  };
}
export function loadMemberShipping() {
  return {
    type: constants.LOAD_MEMBER_SHIPPING,
  };
}
export function loadMemberShippingSuccess(payload) {
  return {
    type: constants.LOAD_MEMBER_SHIPPING_SUCCESS,
    payload,
  };
}
export function loadMemberShippingError(payload) {
  return {
    type: constants.LOAD_MEMBER_SHIPPING_ERROR,
    payload,
  };
}

export function uploadImage(payload) {
  return {
    type: constants.UPLOAD_IMG,
    payload,
  };
}

export function uploadImageSuccess(payload) {
  return {
    type: constants.UPLOAD_IMG_SUCCESS,
    payload,
  };
}

export function uploadImageError(payload) {
  return {
    type: constants.UPLOAD_IMG_ERROR,
    payload,
  };
}

export function setPaymentData(payload) {
  return {
    type: constants.SET_PAYMENT_DATA,
    payload,
  };
}

export function setPaymentDataSuccess(payload) {
  return {
    type: constants.SET_PAYMENT_DATA_SUCCESS,
    payload,
  };
}

export function setPaymentDataError(payload) {
  return {
    type: constants.SET_PAYMENT_DATA_ERROR,
    payload,
  };
}

export function checkSlip(payload) {
  return {
    type: constants.CHECK_SLIP,
    payload,
  };
}

export function checkSlipSuccess(payload) {
  return {
    type: constants.CHECK_SLIP_SUCCESS,
    payload,
  };
}

export function checkSlipError(payload) {
  return {
    type: constants.CHECK_SLIP_ERROR,
    payload,
  };
}

export function deleteItemCart(payload) {
  return {
    type: constants.DELETE_ITEM_CART,
    payload,
  };
}

export function deleteItemCartSuccess(payload) {
  return {
    type: constants.DELETE_ITEM_CART_SUCCESS,
    payload,
  };
}

export function deleteItemCartError(payload) {
  return {
    type: constants.DELETE_ITEM_CART_ERROR,
    payload,
  };
}

export function updateItemCart(payload) {
  return {
    type: constants.UPDATE_ITEM_CART,
    payload,
  };
}

export function updateItemCartSuccess(payload) {
  return {
    type: constants.UPDATE_ITEM_CART_SUCCESS,
    payload,
  };
}

export function updateItemCartError(payload) {
  return {
    type: constants.UPDATE_ITEM_CART_ERROR,
    payload,
  };
}

export function updateAddressForm(payload) {
  return {
    type: constants.UPDATE_ADDRESS_FORM,
    payload,
  };
}

export function updateAddressFormSuccess(payload) {
  return {
    type: constants.UPDATE_ADDRESS_FORM_SUCCESS,
    payload,
  };
}

export function updateAddressFormError(payload) {
  return {
    type: constants.UPDATE_ADDRESS_FORM_ERROR,
    payload,
  };
}

export function updateShoppingStep(payload) {
  return {
    type: constants.UPDATE_SHOPPING_STEP,
    payload,
  };
}

export function updateShoppingStepSuccess(payload) {
  return {
    type: constants.UPDATE_SHOPPING_STEP_SUCCESS,
    payload,
  };
}

export function updateShoppingStepError(payload) {
  return {
    type: constants.UPDATE_SHOPPING_STEP_ERROR,
    payload,
  };
}

export function updateSlipPath(payload) {
  return {
    type: constants.UPDATE_SLIP_PATH,
    payload,
  };
}

export function updateSlipPathSuccess(payload) {
  return {
    type: constants.UPDATE_SLIP_PATH_SUCCESS,
    payload,
  };
}

export function updateSlipPathError(payload) {
  return {
    type: constants.UPDATE_SLIP_PATH_ERROR,
    payload,
  };
}

export function loadBranchLocation() {
  return {
    type: constants.LOAD_BRANCH_LOCATION,
  };
}

export function loadBranchLocationSuccess(payload) {
  return {
    type: constants.LOAD_BRANCH_LOCATION_SUCCESS,
    payload,
  };
}

export function loadBranchLocationError(payload) {
  return {
    type: constants.LOAD_BRANCH_LOCATION_ERROR,
    payload,
  };
}

export function loadBranchList() {
  return {
    type: constants.LOAD_BRANCH_LIST,
  };
}
export function loadBranchListSuccess(payload) {
  return {
    type: constants.LOAD_BRANCH_LIST_SUCCESS,
    payload,
  };
}

export function loadBranchListError(payload) {
  return {
    type: constants.LOAD_BRANCH_LIST_ERROR,
    payload,
  };
}

export function updateTransportAmt(payload) {
  return {
    type: constants.UPDATE_TRANSPORT_AMT,
    payload,
  };
}

export function updateTransportAmtSuccess(payload) {
  return {
    type: constants.UPDATE_TRANSPORT_AMT_SUCCESS,
    payload,
  };
}

export function updateTransportAmtError(payload) {
  return {
    type: constants.UPDATE_TRANSPORT_AMT_ERROR,
    payload,
  };
}
