import { put, select, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getCookie } from 'react-use-cookie';

import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export function* onRequestChangePassword() {
  try {
    const requestURL = `${appConstants.publicPath}/api/member/change_password`;
    const { email, mobile, secret } = yield select(selectors.makeSelectRequest());
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({ email, mobile, secret }),
    });
    if (response.status === 'Success') {
      yield put(actions.requestPasswordSuccess(response));
      yield put(push(`${appConstants.publicPath}/login`));
    } else {
      yield put(actions.requestPasswordError(response.msg));
    }
  } catch (err) {
    yield put(actions.requestPasswordError(`${err}`));
  }
}

export function* onSendEmail() {
  try {
    const requestURL = `${appConstants.publicPath}/api/login/recover-password`;
    const { email } = yield select(selectors.makeSelectRequest());
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({ email }),
    });
    if (response.status === 'Success') {
      yield put(actions.sendEmailSuccess(response));
      yield put(push(`${appConstants.publicPath}/login`));
    } else {
      yield put(actions.sendEmailError(response.msg));
    }
  } catch (err) {
    yield put(actions.sendEmailError(`${err}`));
  }
}

export default function* forgotPasswordSaga() {
  yield takeEvery(constants.REQUEST_PASSWORD, onRequestChangePassword);
  yield takeEvery(constants.SEND_EMAIL, onSendEmail);
}
