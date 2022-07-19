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
    yield put(actions.loadRedeemSuccess(response.data));
  } catch (err) {
    yield put(actions.loadRedeemError(err));
  }
}

export function* updatePromotionUse() {
  try {
    const requestURL = `${appConstants.publicPath}/api/promotion`;
    const { product_code } = yield select(selectors.makeSelectRedeemPoint());
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({
        product_code,
      }),
    });
    yield put(actions.updatePromotionUseSuccess(response.data));
  } catch (err) {
    yield put(actions.updatePromotionUseError(err));
  }
}

export function* checkPromotionValid() {
  try {
    const { product_code } = yield select(selectors.makeSelectRedeemPoint());
    const requestURL = `${appConstants.publicPath}/api/promotion/product/${product_code}`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.checkPromotionValidSuccess(response.data));
  } catch (err) {
    yield put(actions.checkPromotionValidError(err));
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
    yield put(actions.createRedeemSuccess(response.data));
  } catch (err) {
    yield put(actions.createRedeemError(err));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  yield takeEvery(constants.LOAD_REDEEM, loadRedeem);
  yield takeEvery(constants.CREATE_REDEEM, createRedeemCode);
  yield takeEvery(constants.UPDATE_PROMOTION_USE, updatePromotionUse);
  yield takeEvery(constants.CHECK_PROMOTION_VALID, checkPromotionValid);
}
