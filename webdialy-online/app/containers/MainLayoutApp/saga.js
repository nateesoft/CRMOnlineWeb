import { put, takeEvery, call } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';

export function* loadProfile() {
  try {
    const email = JSON.parse(getCookie('token') || '');
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/member/${email}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadProfileSuccess(response.data));
  } catch (err) {
    yield put(actions.loadProfileSuccess(err));
  }
}

// Individual exports for testing
export default function* mainLayoutAppSaga() {
  yield takeEvery(constants.LOAD_PROFILE, loadProfile);
}
