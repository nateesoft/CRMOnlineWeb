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
    const requestURL = `${appConstants.publicPath}/api/member/findAll/${page}/${limit}`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    if (response.data) {
      yield put(actions.initLoadSuccess(response.data));
    } else {
      yield put(actions.initLoadError('Not found data'));
    }
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
    if (response.data) {
      yield put(actions.searchSuccess(response.data));
    } else {
      yield put(actions.searchError('Not found data'));
    }
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
    if (response.status === 'Success') {
      yield put(actions.createItemSuccess(response));
    } else {
      yield put(actions.createItemError('Cannot create data'));
    }
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
    if (response.status === 'Success') {
      yield put(actions.updateItemSuccess(response));
    } else {
      yield put(actions.updateItemError('Cannot update data'));
    }
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
    if (response.status === 'Success') {
      yield put(actions.deleteItemSuccess(response));
    } else {
      yield put(actions.deleteItemError('Cannot update data'));
    }
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
    if (response.data) {
      yield put(actions.loadRolesSuccess(response.data));
    } else {
      yield put(actions.loadRolesError('Not found data'));
    }
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
