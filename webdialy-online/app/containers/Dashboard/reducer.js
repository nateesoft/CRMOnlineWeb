/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { v4 } from 'uuid';
import * as loginConstants from 'containers/Login/constants';
import * as constants from './constants';

export const initialState = {
  redeem: [],
  redeemPoint: {
    uuid_index: '',
    product_code: '',
    redeem_code: '',
  },
  email: '',
  error: '',
  promotionValid: false,
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginConstants.CHECK_LOGOUT:
      case constants.INIT_STATE:
        draft.redeem = [];
        draft.redeemPoint = {};
        draft.email = '';
        draft.error = '';
        break;
      case constants.LOAD_REDEEM:
        break;
      case constants.LOAD_REDEEM_SUCCESS:
        draft.redeem = action.payload;
        break;
      case constants.LOAD_REDEEM_ERROR:
        draft.error = action.payload;
        break;
      case constants.CREATE_REDEEM:
        draft.redeemPoint.product_code = action.payload;
        draft.redeemPoint.uuid_index = v4();
        break;
      case constants.CREATE_REDEEM_SUCCESS:
        draft.redeemPoint.redeem_code = action.payload;
        break;
      case constants.CREATE_REDEEM_ERROR:
        draft.error = action.payload;
        break;
      case constants.UPDATE_PROMOTION_USE:
        draft.redeemPoint.product_code = action.payload;
        break;
      case constants.UPDATE_PROMOTION_USE_SUCCESS:
        break;
      case constants.UPDATE_PROMOTION_USE_ERROR:
        draft.error = action.payload;
        break;
      case constants.CHECK_PROMOTION_VALID:
        draft.promotionValid = false;
        draft.redeemPoint.product_code = action.payload;
        break;
      case constants.CHECK_PROMOTION_VALID_SUCCESS:
        if (action.payload.qty_in_stock <= 0) {
          draft.promotionValid = false;
        } else {
          draft.promotionValid = true;
        }
        break;
      case constants.CHECK_PROMOTION_VALID_ERROR:
        draft.error = action.payload;
        draft.promotionValid = false;
        break;
    }
  });

export default dashboardReducer;
