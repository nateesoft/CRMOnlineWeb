import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';

export function* initLoad() {
  try {
    const requestURL = `${appConstants.publicPath}/api/database_config`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    yield put(actions.initLoadSuccess(response.data));
  } catch (err) {
    yield put(actions.initLoadError(err));
  }
}

export default function* clientRegisterSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
}
