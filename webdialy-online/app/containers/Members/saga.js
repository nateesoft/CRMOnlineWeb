import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

export function* initLoad({ payload }) {
  try {
    const { page, limit } = payload;
    const requestURL = `${appConstants.publicPath}/api/member/findAll/${page || 1}/${limit || 20}`;
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
    const requestURL = `${appConstants.publicPath}/api/member/search`;
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

export function* saveData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/member`;
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify(data),
    });
    yield put(actions.createItemSuccess(response));
  } catch (err) {
    yield put(actions.createItemError(err));
  }
}

export function* updateMemberData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/member/${data.uuid_index}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    yield put(actions.updateItemSuccess(response));
  } catch (err) {
    yield put(actions.updateItemError(err));
  }
}

export function* deleteData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/member/${data.email}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'DELETE',
      body: JSON.stringify(data),
    });
    yield put(actions.deleteItemSuccess(response));
  } catch (err) {
    yield put(actions.deleteItemError(err));
  }
}

export function* onLoadRolesList() {
  try {
    const requestURL = `${appConstants.publicPath}/api/role`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadRolesSuccess(response.data));
  } catch (err) {
    yield put(actions.loadRolesError(err));
  }
}

export default function* membersSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
  yield takeEvery(constants.CREATE_ITEM, saveData);
  yield takeEvery(constants.UPDATE_ITEM, updateMemberData);
  yield takeEvery(constants.DELETE_ITEM, deleteData);
  yield takeEvery(constants.SEARCH, searchItem);
  yield takeEvery(constants.LOAD_ROLES, onLoadRolesList);
}
