import { call, put, select, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

export function* initLoad() {
  try {
    const requestURL = `${appConstants.publicPath}/api/carts`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.initLoadSuccess(response.data));
  } catch (err) {
    yield put(actions.initLoadError(err));
  }
}
export function* searchItem({ payload }) {
  const { key, value } = payload;
  try {
    const requestURL = `${appConstants.publicPath}/api/carts/search`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
    yield put(actions.searchSuccess(response.data));
  } catch (err) {
    yield put(actions.searchError(err));
  }
}

export function* onUpdateShoppingStep() {
  try {
    const { cart_no: cartNo, approve, reason, member_code: memberCode } = yield select(
      selectors.makeSelectCartStatus(),
    );
    const requestURL = `${appConstants.publicPath}/api/carts/shopping_approve`;
    const database = getCookie('database');
    const { code } = yield select(mainSelectors.makeSelectProfile());
    const response = yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({
        cart_no: cartNo,
        shopping_step: approve,
        emp_code_update: code,
        emp_reason: reason,
        member_code: memberCode,
      }),
    });
    yield initLoad();
    yield put(actions.updateShoppingStepSuccess('Finish checkout order step'));
  } catch (err) {
    yield put(actions.updateShoppingStepError(err));
  }
}

export function* onLoadViewOrder() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    yield put(push(`${appConstants.publicPath}/order_confirm/${data.cart_no}/${database}`));
    yield put(actions.loadViewOrderSuccess('Success'));
  } catch (err) {
    yield put(actions.loadViewOrderError(err));
  }
}

export default function* checkCartsSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
  yield takeEvery(constants.SEARCH, searchItem);
  yield takeEvery(constants.UPDATE_SHOPPING_STEP, onUpdateShoppingStep);
  yield takeEvery(constants.LOAD_VIEW_ORDER, onLoadViewOrder);
}
