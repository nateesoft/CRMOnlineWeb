import { put, select, takeEvery, call } from 'redux-saga/effects';
import request from 'utils/request';
import * as types from './constants';
import * as actions from './actions';
import * as selects from './selectors';

export function* initLoad() {
  try {
    const { member_code } = yield select(selects.makeSelectAddressShipping());
    const requestURL = `${types.publicPath}/api/shipping/${member_code}`;
    try {
      const response = yield call(request, requestURL, {
        method: 'GET',
      });
      yield put(actions.initLoadSuccess(response.data[0]));
    } catch (error) {
      yield put(actions.initLoadError(error));
    }
  } catch (err) {
    yield put(actions.initLoadError(err));
  }
}

export function* onEditShipping() {
  try {
    const requestURL = `${types.publicPath}/api/shipping`;
    const addressData = yield select(selects.makeSelectAddressData());
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
    if (response.status === 'Success') {
      yield put(actions.editShippingSuccess());
    } else {
      yield put(actions.editShippingError(response.msg));
    }
  } catch (err) {
    yield put(actions.editShippingError(err));
  }
}

// Individual exports for testing
export default function* addressShippingSaga() {
  yield takeEvery(types.INIT_LOAD, initLoad);
  yield takeEvery(types.EDIT_SHIPPING, onEditShipping);
}
