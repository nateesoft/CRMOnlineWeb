/*
 *
 * MsProductGroup actions
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

export function loadDataFromFile(payload) {
  return {
    type: constants.LOAD_DATA_FROM_FILE,
    payload,
  };
}
export function saveDataImport() {
  return {
    type: constants.SAVE_DATA_IMPORT,
  };
}
export function saveDataImportSuccess(payload) {
  return {
    type: constants.SAVE_DATA_IMPORT_SUCCESS,
    payload,
  };
}
export function saveDataImportError(payload) {
  return {
    type: constants.SAVE_DATA_IMPORT_ERROR,
    payload,
  };
}
export function setHeaders(payload) {
  return {
    type: constants.SET_HEADERS,
    payload,
  };
}
