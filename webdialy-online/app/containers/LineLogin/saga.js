import { put, takeEvery, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import { checkLoginSuccess, checkLoginError } from 'containers/Login/actions';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as selectors from './selectors';

export function* onVerifyTokenLogin() {
  try {
    // verify token for username, password
    const token = yield select(selectors.makeSelectToken());
    const reqURL = `${appConstants.publicPath}/api/line/login`;
    const responseToken = yield call(request, reqURL, {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    if (responseToken.status === 'Success') {
      // send to login api
      const { username, password, database } = responseToken.data;
      const requestURL = `${appConstants.publicPath}/api/member/login`;
      const response = yield call(request, requestURL, {
        database,
        method: 'POST',
        body: JSON.stringify({
          email: username,
          password,
        }),
      });
      if (response.status === 'Success') {
        yield put(checkLoginSuccess(response));
        yield put(push(`${appConstants.publicPath}/home/dashboard`));
      } else {
        yield put(checkLoginError('Email or password invalid'));
      }
    } else {
      yield put(checkLoginError('Invalid token or expired'));
    }
  } catch (err) {
    yield put(checkLoginError(err));
  }
}

export default function* lineLoginSaga() {
  yield takeEvery(constants.VERIFY_TOKEN, onVerifyTokenLogin);
}
