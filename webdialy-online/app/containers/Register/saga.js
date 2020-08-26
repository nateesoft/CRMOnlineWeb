import { put, select, takeLatest, call } from 'redux-saga/effects';
import moment from 'moment';
import { push } from 'connected-react-router';
import request from 'utils/request';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectMember } from './selectors';

export function* onAddRegisterMember() {
  try {
    const requestURL = `${types.publicPath}/api/member`;
    const member = yield select(makeSelectMember());
    const {
      prefix,
      firstName,
      lastName,
      mobile,
      dateOfBirth,
      email,
      password,
      lineId,
    } = member;
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic YWRtaW46c29mdHBvczIwMTM=`
      },
      body: JSON.stringify({
        Member_Code: Math.random()
          .toString(36)
          .substr(2, 9),
        Member_TitleNameThai: prefix,
        Member_FirstName: firstName,
        Member_LastName: lastName,
        Member_HomeTel: mobile,
        Member_Mobile: mobile,
        Member_Email: email,
        Username: email,
        Password: password,
        System_Created: moment().format('YYYY-MM-DD HH:mm:ss'),
        System_Updated: moment().format('YYYY-MM-DD HH:mm:ss'),
        Member_TotalScore: 0,
        Member_TotalPurchase: 0,
        Member_PointExpiredDate: moment()
          .add(10, 'years')
          .format('YYYY-MM-DD'),
        Member_ExpiredDate: moment()
          .add(10, 'years')
          .format('YYYY-MM-DD'),
        Member_Brithday: dateOfBirth,
        Line_Id: lineId,
      }),
    });
    yield put(actions.addRegisterMemberSuccess());
    yield put(push(`${types.publicPath}/login`));
  } catch (err) {
    yield put(actions.addRegisterMemberError(err));
  }
}

export default function* registerSaga() {
  yield takeLatest(types.ADD_REGISTER_MEMBER, onAddRegisterMember);
}
