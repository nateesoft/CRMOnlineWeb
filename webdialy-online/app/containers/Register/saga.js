import { put, select, takeEvery, call } from 'redux-saga/effects';
import moment from 'moment';
import { push } from 'react-router-redux';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export function* onAddRegisterMember() {
  try {
    const requestURL = `${appConstants.publicPath}/api/member`;
    const data = yield select(selectors.makeSelectMember());
    const database = getCookie('database');
    yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({
        code: '',
        uuid_index: data.uuid_index,
        prefix: data.prefix,
        first_name: data.first_name,
        last_name: data.last_name,
        mobile: data.mobile,
        email: data.email,
        username: data.email,
        password: data.password,
        system_created: moment().format('YYYY-MM-DD HH:mm:ss'),
        system_updated: moment().format('YYYY-MM-DD HH:mm:ss'),
        total_score: 0,
        total_purchase: 0,
        point_expired_date: moment()
          .add(10, 'years')
          .format('YYYY-MM-DD'),
        expired_date: moment()
          .add(10, 'years')
          .format('YYYY-MM-DD'),
        birthday: data.birthday,
        line_id: data.line_id,
        member_role: 'member',
      }),
    });
    yield put(actions.addRegisterMemberSuccess());
    window.location.href = `${appConstants.publicPath}/login`;
  } catch (err) {
    yield put(actions.addRegisterMemberError(err));
  }
}

export default function* registerSaga() {
  yield takeEvery(constants.ADD_REGISTER_MEMBER, onAddRegisterMember);
}
