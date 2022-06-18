import { put, select, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export function* onValidLogin() {
  try {
    const requestURL = `${appConstants.publicPath}/api/login`;
    const loginForm = yield select(selectors.makeSelectLogin());
    const database = getCookie('database');
    const { username, password } = loginForm;
    const encryptPassword = Buffer.from(password).toString('base64');
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({ username, password: encryptPassword }),
    });
    if (response.status === 'Success') {
      yield put(actions.checkLoginSuccess(username));
      yield put(push(`${appConstants.publicPath}/home/dashboard`));
    } else if (response.status === 'Missing Role') {
      yield put(actions.checkLoginError(response.msg));
    } else {
      yield put(actions.checkLoginError('Username or password invalid'));
    }
  } catch (err) {
    yield put(actions.checkLoginError(`${err}`));
  }
}

export function* onLogout() {
  try {
    yield put(actions.checkLogoutSuccess());
  } catch (err) {
    yield put(actions.checkLogoutError(err));
  }
}

export function* getCompanyProfile() {
  try {
    const requestURL = `${appConstants.publicPath}/api/company`;
    const database = JSON.parse(getCookie('database'));
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadCompanySuccess(response.data[0]));
  } catch (err) {
    yield put(actions.loadCompanyError(err));
  }
}

export default function* loginSaga() {
  yield takeEvery(constants.INIT_DATABASE, getCompanyProfile);
  yield takeEvery(constants.CHECK_LOGIN, onValidLogin);
  yield takeEvery(constants.CHECK_LOGOUT, onLogout);
}
