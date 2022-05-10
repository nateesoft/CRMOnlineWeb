/*
 *
 * ForgotPassword reducer
 *
 */
import produce from 'immer';
import * as loginConstants from 'containers/Login/constants';
import * as constants from './constants';

export const initialState = {
  request: {
    email: '',
    mobile: '',
    secret: '',
  },
  status: '',
  msg: '',
};

/* eslint-disable default-case, no-param-reassign */
const forgotPasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginConstants.CHECK_LOGOUT:
      case constants.INIT_STATE:
        draft.status = '';
        break;
      case constants.REQUEST_PASSWORD:
        draft.request = action.payload;
        break;
      case constants.REQUEST_PASSWORD_SUCCESS:
        draft.status = 'Success';
        draft.msg = 'Change password to default success';
        break;
      case constants.REQUEST_PASSWORD_ERROR:
        draft.status = 'Error';
        draft.msg = 'Error to Change password !!!';
        break;
      case constants.SEND_EMAIL:
        draft.request = {
          email: action.payload,
        };
        break;
      case constants.SEND_EMAIL_SUCCESS:
        draft.status = 'Success';
        draft.msg = 'Change password to default success';
        break;
      case constants.SEND_EMAIL_ERROR:
        draft.status = 'Error';
        draft.msg = 'Error to Change password !!!';
        break;
    }
  });

export default forgotPasswordReducer;
