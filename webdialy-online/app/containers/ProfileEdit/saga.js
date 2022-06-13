import { put, select, takeEvery, call } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export function* onEditMember() {
  try {
    const email = JSON.parse(getCookie('token') || '');
    const { profile } = yield select(selectors.makeSelectProfile());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/member/${email}`;
    yield call(request, requestURL, {
      database,
      method: 'PUT',
      body: JSON.stringify(profile),
    });
    yield put(actions.editMemberSuccess());
  } catch (err) {
    yield put(actions.editMemberError(err));
  }
}

// Individual exports for testing
export default function* profileEditSaga() {
  yield takeEvery(constants.EDIT_MEMBER, onEditMember);
}
