/*
 *
 * MsProduct reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';
import * as loginConstants from 'containers/Login/constants';
const { v4 } = require('uuid');

export const initialState = {
  list: [],
  data: {
    uuid_index: '',
    code: '',
    name: '',
    unit_sale: '',
    group_code: '',
  },
  productImportHeaders: [],
  productImports: [],
  page: 'LIST',
  img_upload: null,
  status: null,
  message: null,
  currentId: '',
  response: {
    status: null,
    message: null,
  },
  profile: {},
};

/* eslint-disable default-case, no-param-reassign */
const msProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginConstants.CHECK_LOGOUT:
      case constants.INIT_STATE:
        draft.list= [];
        draft.data= {};
        draft.page= 'LIST';
        draft.img_upload= null;
        draft.status= null;
        draft.message= null;
        draft.currentId= '';
        draft.response= {};
        break;
      case constants.CHANGE_PAGE:
        draft.page = action.payload;
        draft.response.status = '';
        draft.response.message = '';
        break;
      case constants.INIT_LOAD:
        break;
      case constants.INIT_LOAD_SUCCESS:
        draft.list = action.payload;
        break;
      case constants.INIT_LOAD_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Load data error!';
        break;
      case constants.LOAD_EDIT:
        draft.data = action.payload;
        break;
      case constants.LOAD_EDIT_SUCCESS:
        draft.list = action.payload;
        break;
      case constants.LOAD_EDIT_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Load data to edit error!';
        break;
      case constants.CREATE_ITEM:
        draft.data = action.payload;
        draft.data.uuid_index = v4();
        break;
      case constants.CREATE_ITEM_SUCCESS:
        draft.response.status = 'Success';
        draft.response.message = 'Create item success';
        break;
      case constants.CREATE_ITEM_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Create data error!';
        break;
      case constants.UPDATE_ITEM:
        draft.data = action.payload;
        break;
      case constants.UPDATE_ITEM_SUCCESS:
        draft.response.status = 'Success';
        draft.response.message = 'Update data success';
        break;
      case constants.UPDATE_ITEM_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Update data error!';
        break;
      case constants.DELETE_ITEM:
        draft.data.uuid_index = action.payload;
        break;
      case constants.DELETE_ITEM_SUCCESS:
        draft.response.status = 'Success';
        draft.response.message = 'Delete data success';
        break;
      case constants.DELETE_ITEM_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Delete data error!';
        break;
      case constants.UPLOAD_IMG:
        draft.img_upload = action.payload;
        break;
      case constants.UPLOAD_IMG_SUCCESS:
        draft.response.status = 'Upload_Success';
        draft.response.message = 'Upload file image success';
        break;
      case constants.UPLOAD_IMG_ERROR:
        draft.response.status = 'Upload_Error';
        draft.response.message = 'Upload file image error!';
        break;
      case constants.LOAD_PROFILE:
        break;
      case constants.LOAD_PROFILE_SUCCESS:
        draft.profile = action.payload;
        break;
      case constants.LOAD_PROFILE_ERROR:
        break;
      case constants.LOAD_DATA_FROM_FILE:
        draft.productImports = action.payload;
      case constants.SAVE_DATA_IMPORT:
        break;
      case constants.SAVE_DATA_IMPORT_SUCCESS:
        draft.profile = action.payload;
        break;
      case constants.SAVE_DATA_IMPORT_ERROR:
        break;
      case constants.SET_HEADERS:
        draft.productImportHeaders = action.payload;
        break;
    }
  });

export default msProductReducer;
