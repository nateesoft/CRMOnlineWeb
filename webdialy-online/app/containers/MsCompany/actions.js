/*
 *
 * MsCompany actions
 *
 */

import * as constants from './constants';

export function initLoad() {
  return {
    type: constants.INIT_LOAD,
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

export function createItem() {
  return {
    type: constants.CREATE_ITEM,
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

export function updateItem() {
  return {
    type: constants.UPDATE_ITEM,
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

export function deleteItem() {
  return {
    type: constants.DELETE_ITEM,
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

export function getItem() {
  return {
    type: constants.GET_ITEM,
  };
}

export function getItemSuccess(payload) {
  return {
    type: constants.GET_ITEM_SUCCESS,
    payload,
  };
}

export function getItemError(payload) {
  return {
    type: constants.GET_ITEM_ERROR,
    payload,
  };
}
