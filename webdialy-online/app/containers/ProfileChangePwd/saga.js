import { put, select, takeEvery, call } from 'redux-saga/effects';
import { getCookie, setCookie } from 'react-use-cookie';
import { push } from 'react-router-redux';

import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export function* onUpdatePassword() {
  try {
    const requestURL = `${appConstants.publicPath}/api/login`;
    const { mobile, email, new_password: newPassword } = yield select(
      selectors.makeSelectEditForm(),
    );
    const database = getCookie('database');
    yield call(request, requestURL, {
      database,
      method: 'PUT',
      body: JSON.stringify({
        mobile,
        email,
        new_password: newPassword,
      }),
    });
    yield put(actions.updatePasswordSuccess());
  } catch (err) {
    yield put(actions.updatePasswordError(err));
  }
}

export function* onLogout() {
  setCookie('token', '');
}

// Individual exports for testing
export default function* profileChangePwdSaga() {
  yield takeEvery(constants.UPDATE_PASSWORD, onUpdatePassword);
  yield takeEvery(constants.LOGOUT, onLogout);
}
