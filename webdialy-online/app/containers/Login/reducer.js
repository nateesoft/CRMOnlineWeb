/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  loginForm: {
    username: '',
    password: '',
  },
  response: {
    status: null,
    message: null,
  },
  profile: {},
  loggedIn: false,
  queryDb: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.INIT_DATABASE:
        draft.queryDb = action.payload;
        break;
      case constants.INIT_STATE:
        draft.loginForm = {};
        draft.response = {};
        draft.profile = {};
        draft.loggedIn = false;
        draft.error = '';
        break;
      case constants.CHECK_LOGIN:
        draft.loginForm = action.payload;
        break;
      case constants.CHECK_LOGIN_SUCCESS:
        draft.loggedIn = true;
        break;
      case constants.CHECK_LOGIN_ERROR:
        draft.error = action.payload;
        draft.loggedIn = false;
        break;
      case constants.CHECK_LOGOUT:
        break;
      case constants.CHECK_LOGOUT_SUCCESS:
        draft.loginForm.username = '';
        draft.loginForm.password = '';
        draft.loggedIn = false;
        break;
      case constants.CHECK_LOGOUT_ERROR:
        draft.error = action.error;
        break;
      case constants.CLEAR_LOGIN:
        draft.error = '';
        draft.loginForm = {
          username: '',
          password: '',
        };
        draft.loggedIn = false;
        break;
      case constants.LOAD_PROFILE_TOKEN:
        draft.profile = action.payload;
        break;
      case constants.LOAD_COMPANY_SUCCESS:
        draft.company = action.payload;
        break;
      case constants.LOAD_COMPANY_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default loginReducer;
