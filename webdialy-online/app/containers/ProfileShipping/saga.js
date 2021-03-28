import { put, select, takeEvery, call } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export function* initLoad() {
  try {
    const { code: member_code } = yield select(mainSelectors.makeSelectProfile());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/shipping/${member_code}`;
    try {
      const response = yield call(request, requestURL, {
        database,
        method: 'GET',
      });
      if (response.status === 'Success') {
        if (response.data.length > 0) {
          yield put(actions.initLoadSuccess(response.data[0]));
        } else {
          yield put(actions.initLoadSuccess({}));
        }
      } else {
        yield put(actions.initLoadError(response.msg));
      }
    } catch (error) {
      yield put(actions.initLoadError(error));
    }
  } catch (err) {
    yield put(actions.initLoadError(err));
  }
}

export function* onEditShipping() {
  try {
    const requestURL = `${appConstants.publicPath}/api/shipping`;
    const addressData = yield select(selectors.makeSelectAddressData());
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: addressData.create===true ? 'POST': 'PUT',
      body: JSON.stringify(addressData),
    });
    if (response.status === 'Success') {
      yield put(actions.editShippingSuccess(response.data));
    } else {
      yield put(actions.editShippingError(response.msg));
    }
  } catch (err) {
    yield put(actions.editShippingError(err));
  }
}

// Individual exports for testing
export default function* profileShippingSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
  yield takeEvery(constants.EDIT_SHIPPING, onEditShipping);
}
