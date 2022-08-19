/*
 *
 * Checkout reducer
 *
 */
import produce from 'immer';
import { v4 } from 'uuid';
import * as loginConstants from 'containers/Login/constants';
import * as constants from './constants';

export const initialState = {
  branchList: [],
  cart_no: '',
  product: {
    product_code: '',
    qty: 0,
  },
  cartList: [],
  member_code: '',
  memberShipping: {},
  paymentData: {},
  img_upload: null,
  slipFileName: '',
  slipValidateStatus: '',
  addressForm: {},
  slipPath: '',
  response: {
    status: '',
    message: '',
  },
  branch: {},
};

/* eslint-disable default-case, no-param-reassign */
const checkoutReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginConstants.CHECK_LOGOUT:
      case constants.INIT_STATE:
        draft.cartList = [];
        draft.cart_no = '';
        draft.product = {};
        draft.member_code = '';
        draft.memberShipping = {};
        draft.paymentData = {};
        draft.img_upload = null;
        draft.slipFileName = '';
        draft.response = {};
        break;
      case constants.LOAD_CART:
        draft.slipValidateStatus = '';
        draft.cart_no = action.payload;
        break;
      case constants.LOAD_CART_SUCCESS:
        draft.cartList = action.payload;
        draft.response.status = 'Load_Order_Success';
        draft.response.message = 'Load order success';
        break;
      case constants.LOAD_CART_ERROR:
        draft.response.status = 'Load_Order_Error';
        draft.response.message = 'Load order error!';
        break;
      case constants.LOAD_MEMBER_SHIPPING:
        break;
      case constants.LOAD_MEMBER_SHIPPING_SUCCESS:
        if (Object.keys(action.payload).length === 0) {
          draft.memberShipping = {
            ...action.payload,
            create: true,
            uuid_index: v4(),
          };
        } else {
          draft.memberShipping = {
            ...action.payload,
          };
        }
        draft.response.status = 'Load_Member_Shipping_Success';
        draft.response.message = 'Load member shipping success';
        break;
      case constants.LOAD_MEMBER_SHIPPING_ERROR:
        draft.response.status = 'Load_Member_Shipping_Error';
        draft.response.message = 'Load member shipping error!';
        break;
      case constants.UPLOAD_IMG:
        draft.img_upload = action.payload;
        draft.slipFileName = action.payload.name;
        draft.slipPath = action.payload.name;
        break;
      case constants.UPLOAD_IMG_SUCCESS:
        draft.response.status = 'Upload_Success';
        draft.response.message = 'Upload file image success';
        break;
      case constants.UPLOAD_IMG_ERROR:
        draft.response.status = 'Upload_Error';
        draft.response.message = 'Upload file image error!';
        break;
      case constants.SET_PAYMENT_DATA:
        draft.paymentData = action.payload;
        break;
      case constants.SET_PAYMENT_DATA_ERROR:
        break;
      case constants.CHECK_SLIP:
        draft.slipFileName = action.payload;
        break;
      case constants.CHECK_SLIP_SUCCESS:
        if (action.payload.length > 40) {
          draft.slipValidateStatus = 'Success';
          draft.response.message = 'Validate slip file image success';
        } else {
          draft.slipValidateStatus = 'Warning';
          draft.response.message = 'Data in slip incorrect format';
        }
        break;
      case constants.CHECK_SLIP_ERROR:
        draft.slipValidateStatus = 'Error';
        draft.response.message = 'Validate slip file image error!';
        break;
      case constants.DELETE_ITEM_CART:
        draft.product.product_code = action.payload;
        break;
      case constants.DELETE_ITEM_CART_ERROR:
        break;
      case constants.UPDATE_ITEM_CART:
        draft.product = action.payload;
        break;
      case constants.UPDATE_ITEM_CART_ERROR:
        break;
      case constants.UPDATE_ADDRESS_FORM:
        draft.addressForm = action.payload;
        if (!action.payload.uuid_index) {
          draft.addressForm = { ...action.payload, uuid_index: v4() };
        }
        break;
      case constants.UPDATE_ADDRESS_FORM_SUCCESS:
        draft.response = {
          status: 'Success_Update_Address',
          message: 'Update Address Success',
        };
        break;
      case constants.UPDATE_ADDRESS_FORM_ERROR:
        break;
      case constants.UPDATE_SLIP_PATH:
        draft.slipPath = action.payload;
        break;
      case constants.UPDATE_SLIP_PATH_SUCCESS:
        break;
      case constants.UPDATE_SLIP_PATH_ERROR:
        break;
      case constants.LOAD_BRANCH_LOCATION:
        break;
      case constants.LOAD_BRANCH_LOCATION_SUCCESS:
        draft.branch = action.payload;
        break;
      case constants.LOAD_BRANCH_LOCATION_ERROR:
        draft.response = {
          status: 'Load_Branch_Location_Error',
          message: 'Load branch locaation error',
        };
        break;
      case constants.LOAD_BRANCH_LIST_SUCCESS:
        draft.branchList = action.payload;
        break;
      case constants.LOAD_BRANCH_LIST_ERROR:
        draft.branchList = [];
        break;
      case constants.UPDATE_TRANSPORT_AMT:
        draft.paymentData.distance = action.payload;
        break;
      case constants.UPDATE_TRANSPORT_AMT_SUCCESS:
        break;
      case constants.UPDATE_TRANSPORT_AMT_ERROR:
        break;
    }
  });

export default checkoutReducer;
