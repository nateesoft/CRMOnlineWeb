/*
 *
 * Members reducer
 *
 */
import produce from 'immer';
import { v4 } from 'uuid';
import * as loginConstants from 'containers/Login/constants';
import * as constants from './constants';

export const initialState = {
  list: [],
  rolesList: [],
  data: {
    uuid_index: '',
    code: '',
    email: '',
    first_name: '',
    last_name: '',
    member_role: '',
    total_score: 0,
    total_purchase: 0,
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
const membersReducer = (state = initialState, action) =>
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
        draft.limit = action.payload;
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
        draft.data.email = action.payload;
        break;
      case constants.DELETE_ITEM_SUCCESS:
        draft.response.status = 'Success';
        draft.response.message = 'Delete data success';
        break;
      case constants.DELETE_ITEM_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Delete data error!';
        break;
      case constants.SEARCH:
        break;
      case constants.SEARCH_SUCCESS:
        draft.list = action.payload;
        break;
      case constants.SEARCH_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Search data error!';
        break;
      case constants.LOAD_VIEW:
        draft.data = action.payload;
        break;
      case constants.LOAD_VIEW_SUCCESS:
        draft.list = action.payload;
        break;
      case constants.LOAD_VIEW_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Load data to view error!';
        break;
      case constants.LOAD_ROLES:
        break;
      case constants.LOAD_ROLES_SUCCESS:
        draft.rolesList = action.payload;
        break;
      case constants.LOAD_ROLES_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Load role list!';
        break;
    }
  });

export default membersReducer;
