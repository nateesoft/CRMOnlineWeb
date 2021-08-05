/*
 *
 * ProfileShipping reducer
 *
 */
import produce from 'immer';
import { v4 } from 'uuid';
import * as loginConstants from 'containers/Login/constants';
import * as constants from './constants';

export const initialState = {
  shipping: {
    address_type: '',
    member_prefix: '',
    member_code: '',
    member_name: '',
    member_lastname: '',
    address1: '',
    address2: '',
    province: '',
    district: '',
    sub_district: '',
    postcode: '',
    map_latitude: 13.752434,
    map_longitude: 100.494122,
  },
  address: {},
  status: '',
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const profileShippingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginConstants.CHECK_LOGOUT:
      case constants.INIT_STATE:
        draft.status = '';
        draft.error = '';
        draft.data = {};
        break;
      case constants.INIT_LOAD:
        draft.member_code = action.payload;
        break;
      case constants.INIT_LOAD_SUCCESS:
        draft.shipping = action.payload;
        break;
      case constants.INIT_LOAD_ERROR:
        break;
      case constants.EDIT_SHIPPING:
        draft.address = action.payload;
        break;
      case constants.EDIT_SHIPPING_SUCCESS:
        draft.status = 'Success';
        break;
      case constants.EDIT_SHIPPING_ERROR:
        draft.error = action.payload;
        break;
    }
  });

export default profileShippingReducer;
