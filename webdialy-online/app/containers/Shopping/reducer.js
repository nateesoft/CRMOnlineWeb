/*
 *
 * Shopping reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import { v4 } from 'uuid';
import * as loginConstants from 'containers/Login/constants';
import * as checkoutOrderConstants from 'containers/CheckoutOrder/constants';
import * as constants from './constants';

export const initialState = {
  productList: [],
  cart: {},
  cart_no: '',
  itemCart: {
    carts: {
      uuid_index: '',
      cart_no: '',
      cart_create_date: '',
      member_code: '',
      total_item: 0,
      total_amount: 0,
      cart_active: '',
      shopping_step: '',
      total_point: 0,
    },
    carts_detail: {
      uuid_index: '',
      cart_no: '',
      product_code: '',
      product_name: '',
      product_price: 0,
      product_unit: '',
      qty: 0,
      total_amount: 0,
      options: '',
      special_text: '',
      point: 0,
    },
  },
  search: {
    data: '',
  },
  response: {
    status: '',
    message: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const shoppingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginConstants.CHECK_LOGOUT:
      case checkoutOrderConstants.UPDATE_SHOPPING_STEP_SUCCESS:
      case constants.INIT_STATE:
        draft.productList = [];
        draft.cart = {};
        draft.itemCart = {};
        draft.response = {};
        break;
      case constants.LOAD_PRODUCT:
        break;
      case constants.LOAD_PRODUCT_SUCCESS:
        draft.productList = action.payload;
        draft.response.status = 'Load_Product_Success';
        draft.response.message = 'Load product success';
        break;
      case constants.LOAD_PRODUCT_ERROR:
        draft.response.status = 'Load_Product_Error';
        draft.response.message = 'Load product error!';
        break;
      case constants.CREATE_ITEM_CART:
        draft.itemCart.carts = {
          uuid_index: v4(),
          cart_no: '', // generate at service
          cart_create_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          member_code: action.payload.member_code,
          total_item: 0, // generate at service
          total_amount: 0, // generate at service
          cart_active: 'Y',
          shopping_step: 'order',
          total_point: 0,
        };
        draft.itemCart.carts_detail = {
          uuid_index: v4(),
          cart_no: '',
          product_code: action.payload.code,
          product_name: action.payload.name,
          product_price: action.payload.price_d,
          product_unit: action.payload.unit_code_sale,
          qty: action.payload.qty,
          total_amount: action.payload.total_amount,
          options: action.payload.options,
          special_text: action.payload.special_text,
          point: action.payload.point_total,
        };
        break;
      case constants.CREATE_ITEM_CART_SUCCESS:
        draft.cart = action.payload;
        draft.response.status = 'Create_Cart_Success';
        draft.response.message = 'Create cart success';
        break;
      case constants.CREATE_ITEM_CART_ERROR:
        draft.response.status = 'Create_Cart_Error';
        draft.response.message = 'Create cart error!';
        break;
      case constants.UPDATE_ITEM_CART:
        draft.itemCart.carts = {
          cart_no: action.payload.cart_no, // generate at service
        };
        draft.itemCart.carts_detail = {
          uuid_index: v4(),
          cart_no: action.payload.cart_no,
          product_code: action.payload.code,
          product_name: action.payload.name,
          product_price: action.payload.price_d,
          product_unit: action.payload.unit_code_sale,
          qty: action.payload.qty,
          total_amount: action.payload.total_amount,
          options: action.payload.options,
          special_text: action.payload.special_text,
          point: action.payload.point_total,
        };
        break;
      case constants.UPDATE_ITEM_CART_SUCCESS:
        draft.cart = action.payload;
        draft.response.status = 'Update_Cart_Success';
        draft.response.message = 'Update cart success';
        break;
      case constants.UPDATE_ITEM_CART_ERROR:
        draft.response.status = 'Update_Cart_Error';
        draft.response.message = 'Update cart error!';
        break;
      case constants.SEARCH_PRODUCT:
        draft.productList = [];
        draft.search.data = action.payload;
        break;
      case constants.SEARCH_PRODUCT_SUCCESS:
        draft.productList = action.payload;
        draft.response.status = 'Search_Product_Success';
        draft.response.message = 'Search product success';
        break;
      case constants.SEARCH_PRODUCT_ERROR:
        draft.productList = [];
        draft.response.status = 'Search_Product_Error';
        draft.response.message = 'Search product error!';
        break;
      case constants.LOAD_CART:
        draft.cart_no = action.payload;
        break;
      case constants.LOAD_CART_SUCCESS:
        if (action.payload !== 'Not found carts') {
          draft.cart = action.payload;
          draft.response.status = 'Load_Cart_Success';
          draft.response.message = 'Load cart success';
        } else {
          draft.cart = {
            cart_no: '',
          };
        }
        break;
      case constants.LOAD_CART_ERROR:
        draft.response.status = 'Load_Cart_Error';
        draft.response.message = 'Load cart error!';
        break;
    }
  });

export default shoppingReducer;
