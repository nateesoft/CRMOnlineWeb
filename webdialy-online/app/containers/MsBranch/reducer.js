/*
 *
 * MsBranch reducer
 *
 */
import produce from 'immer';
import { v4 } from 'uuid';
import * as loginConstants from 'containers/Login/constants';
import * as constants from './constants';

export const initialState = {
  list: [],
  data: {
    uuid_index: '',
    code: '',
    name: '',
    map_latitude: 13.809992,
    map_longitude: 100.41313,
    mapping_direction_length1: '',
    mapping_direction_length2: '',
    mapping_direction_length3: '',
    mapping_type1: '',
    mapping_type2: '',
    mapping_type3: '',
    mapping_baht1: '',
    mapping_baht2: '',
    mapping_baht3: '',
  },
  page: 'LIST',
  status: null,
  message: null,
  currentId: '',
  response: {
    status: null,
    message: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const msBranchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginConstants.CHECK_LOGOUT:
      case constants.INIT_STATE:
        draft.list = [];
        draft.data = {};
        draft.page = 'LIST';
        draft.status = null;
        draft.message = null;
        draft.currentId = '';
        draft.response = {};
        break;
      case constants.CHANGE_PAGE:
        draft.page = action.payload;
        draft.response.status = '';
        draft.response.message = '';
        break;
      case constants.INIT_LOAD:
        draft.data = {
          map_latitude: initialState.data.map_latitude,
          map_longitude: initialState.data.map_longitude,
        };
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
        draft.data = { ...action.payload, uuid_index: v4() };
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
    }
  });

export default msBranchReducer;
