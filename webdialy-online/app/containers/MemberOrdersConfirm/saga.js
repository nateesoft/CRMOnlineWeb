import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getCookie, setCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

export function* initLoad() {
  try {
    const { cart_no: cartNo, database } = yield select(selectors.makeSelectData());
    const requestURL = `${appConstants.publicPath}/api/orders/confirm_order/${cartNo}`;
    const dbFromLogin = getCookie('database');
    const dbFromUrl = database || dbFromLogin;
    const response = yield call(request, requestURL, {
      database: dbFromUrl,
      method: 'GET',
    });
    if (response.status === 'Success') {
      // set cookies
      setCookie('database', JSON.stringify(database));
      setCookie('token', JSON.stringify(response.data.member_email));
      yield put(actions.initLoadSuccess(response.data));
    }
  } catch (err) {
    yield put(actions.initLoadError(`${err}`));
  }
}

export function* onApproveConfirmOrder() {
  try {
    const requestURL = `${appConstants.publicPath}/api/orders`;
    const { database, cart_no: cartNo } = yield select(selectors.makeSelectData());
    const {
      order_no: orderNo,
      member_code_update: memberCodeUpdate,
      member_remark: memberRemark,
      signature,
      order_status: orderStatus,
      member_mobile: memberMobile,
    } = yield select(selectors.makeSelectConfirmData());
    const response = yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({
        order_no: orderNo,
        member_code_update: memberCodeUpdate,
        member_remark: memberRemark,
        signature,
        order_status: orderStatus,
        member_mobile: memberMobile,
        cart_no: cartNo,
      }),
    });
    if (response.status === 'Success') {
      yield put(actions.confirmOrderSuccess(response.data));
    } else {
      yield put(actions.confirmOrderError('Email or password invalid'));
    }
  } catch (err) {
    yield put(actions.confirmOrderError(`${err}`));
  }
}

export default function* memberOrdersConfirmSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
  yield takeEvery(constants.CONFIRM_ORDERS, onApproveConfirmOrder);
}
