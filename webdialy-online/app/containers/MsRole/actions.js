/*
 *
 * MsRole actions
 *
 */

import * as constants from './constants';

export function initState() {
  return {
    type: constants.INIT_STATE,
  };
}
export function changePage(payload) {
  return {
    type: constants.CHANGE_PAGE,
    payload,
  };
}
export function initLoad(payload) {
  return {
    type: constants.INIT_LOAD,
    payload,
  };
}

export function initLoadSuccess(payload) {
  return {
    type: constants.INIT_LOAD_SUCCESS,
    payload,
  };
}

export function initLoadError(payload) {
  return {
    type: constants.INIT_LOAD_ERROR,
    payload,
  };
}
export function loadEdit(payload) {
  return {
    type: constants.LOAD_EDIT,
    payload,
  };
}

export function loadEditSuccess(payload) {
  return {
    type: constants.LOAD_EDIT_SUCCESS,
    payload,
  };
}

export function loadEditError(payload) {
  return {
    type: constants.LOAD_EDIT_ERROR,
    payload,
  };
}

export function createItem(payload) {
  return {
    type: constants.CREATE_ITEM,
    payload,
  };
}

export function createItemSuccess(payload) {
  return {
    type: constants.CREATE_ITEM_SUCCESS,
    payload,
  };
}

export function createItemError(payload) {
  return {
    type: constants.CREATE_ITEM_ERROR,
    payload,
  };
}

export function updateItem(payload) {
  return {
    type: constants.UPDATE_ITEM,
    payload,
  };
}

export function updateItemSuccess(payload) {
  return {
    type: constants.UPDATE_ITEM_SUCCESS,
    payload,
  };
}

export function updateItemError(payload) {
  return {
    type: constants.UPDATE_ITEM_ERROR,
    payload,
  };
}

export function deleteItem(payload) {
  return {
    type: constants.DELETE_ITEM,
    payload,
  };
}

export function deleteItemSuccess(payload) {
  return {
    type: constants.DELETE_ITEM_SUCCESS,
    payload,
  };
}

export function deleteItemError(payload) {
  return {
    type: constants.DELETE_ITEM_ERROR,
    payload,
  };
}

export function search(payload) {
  return {
    type: constants.SEARCH,
    payload,
  };
}

export function searchSuccess(payload) {
  return {
    type: constants.SEARCH_SUCCESS,
    payload,
  };
}

export function searchError(payload) {
  return {
    type: constants.SEARCH_ERROR,
    payload,
  };
}
