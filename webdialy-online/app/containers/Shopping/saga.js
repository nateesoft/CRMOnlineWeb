import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

export function* loadProduct() {
  try {
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/product`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadProductSuccess(response.data));
  } catch (err) {
    yield put(actions.loadProductError(err));
  }
}

export function* saveCartItem() {
  try {
    const data = yield select(selectors.makeSelectItemCart());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/carts`;
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify(data),
    });
    yield put(actions.createItemCartSuccess(response.data[0]));
  } catch (err) {
    yield put(actions.createItemCartError(err));
  }
}

export function* updateCartItem() {
  try {
    const data = yield select(selectors.makeSelectItemCart());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/carts`;
    const response = yield call(request, requestURL, {
      database,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    yield put(actions.updateItemCartSuccess(response.data));
  } catch (err) {
    yield put(actions.updateItemCartError(err));
  }
}

export function* searchProduct() {
  try {
    const database = getCookie('database');
    const { data } = yield select(selectors.makeSelectSearchData());
    const requestURL = `${appConstants.publicPath}/api/product/search/${data || 'no_data'}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.searchProductSuccess(response.data));
  } catch (err) {
    yield put(actions.searchProductError(err));
  }
}

export function* loadCartToShopping() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    if (cartNo === 'new') {
      yield put(actions.loadCartSuccess('Not found carts'));
    } else {
      const database = getCookie('database');
      const requestURL = `${appConstants.publicPath}/api/carts/load-cart-to-shopping`;
      const response = yield call(request, requestURL, {
        database,
        method: 'POST',
        body: JSON.stringify({ cart_no: cartNo }),
      });
      yield put(actions.loadCartSuccess(response.data[0]));
    }
  } catch (err) {
    yield put(actions.loadCartError(err));
  }
}

export default function* shoppingSaga() {
  yield takeEvery(constants.LOAD_PRODUCT, loadProduct);
  yield takeEvery(constants.CREATE_ITEM_CART, saveCartItem);
  yield takeEvery(constants.UPDATE_ITEM_CART, updateCartItem);
  yield takeEvery(constants.SEARCH_PRODUCT, searchProduct);
  yield takeEvery(constants.LOAD_CART, loadCartToShopping);
}
