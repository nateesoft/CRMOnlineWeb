import { put, select, takeEvery, call } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export function* loadRedeem() {
  try {
    const requestURL = `${appConstants.publicPath}/api/redeem`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    if (response.status === 'Success') {
      yield put(actions.loadRedeemSuccess(response.data));
    } else {
      yield put(actions.loadRedeemError('Not found data'));
    }
  } catch (err) {
    yield put(actions.loadRedeemError(err));
  }
}

export function* createRedeemCode() {
  try {
    const { code } = yield select(mainSelectors.makeSelectProfile());
    const { uuid_index: uuidIndex, product_code: productCode } = yield select(
      selectors.makeSelectRedeemPoint(),
    );
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/redeem`;
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({
        uuid_index: uuidIndex,
        product_code: productCode,
        member_code_use: code,
      }),
    });
    if (response.status === 'Success') {
      yield put(actions.createRedeemSuccess(response.data));
    } else {
      yield put(actions.createRedeemError('Create redeem code error'));
    }
  } catch (err) {
    yield put(actions.createRedeemError(err));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  yield takeEvery(constants.LOAD_REDEEM, loadRedeem);
  yield takeEvery(constants.CREATE_REDEEM, createRedeemCode);
}
