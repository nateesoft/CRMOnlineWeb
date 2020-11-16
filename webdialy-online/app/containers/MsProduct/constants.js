/*
 *
 * MsProduct constants
 *
 */

export const publicPath = process.env.REACT_APP_PUBLIC_PATH || '';
export const apiServiceHost = process.env.API_SERVICE || 'http://localhost:5000';

export const INIT_STATE = 'app/MsProduct/INIT_STATE';

export const CHANGE_PAGE = 'app/MsProduct/CHANGE_PAGE';

export const INIT_LOAD = 'app/MsProduct/INIT_LOAD';
export const INIT_LOAD_SUCCESS = 'app/MsProduct/INIT_LOAD_SUCCESS';
export const INIT_LOAD_ERROR = 'app/MsProduct/INIT_LOAD_ERROR';

export const LOAD_EDIT = 'app/MsProduct/LOAD_EDIT';
export const LOAD_EDIT_SUCCESS = 'app/MsProduct/LOAD_EDIT_SUCCESS';
export const LOAD_EDIT_ERROR = 'app/MsProduct/LOAD_EDIT_ERROR';

export const CREATE_ITEM = 'app/MsProduct/CREATE_ITEM';
export const CREATE_ITEM_SUCCESS = 'app/MsProduct/CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_ERROR = 'app/MsProduct/CREATE_ITEM_ERROR';

export const UPDATE_ITEM = 'app/MsProduct/UPDATE_ITEM';
export const UPDATE_ITEM_SUCCESS = 'app/MsProduct/UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_ERROR = 'app/MsProduct/UPDATE_ITEM_ERROR';

export const DELETE_ITEM = 'app/MsProduct/DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'app/MsProduct/DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_ERROR = 'app/MsProduct/DELETE_ITEM_ERROR';

export const UPLOAD_IMG = 'app/MsProduct/UPLOAD_IMG';
export const UPLOAD_IMG_SUCCESS = 'app/MsProduct/UPLOAD_IMG_SUCCESS';
export const UPLOAD_IMG_ERROR = 'app/MsProduct/UPLOAD_IMG_ERROR';
