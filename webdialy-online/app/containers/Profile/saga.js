import { put, takeEvery, call } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';

export function* onLoadCompany() {
  try {
    const requestURL = `${appConstants.publicPath}/api/company`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.initLoadCompanySuccess(response.data[0]));
  } catch (err) {
    yield put(actions.initLoadCompanyError(err));
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeEvery(constants.INIT_LOAD_COMPANY, onLoadCompany);
}
