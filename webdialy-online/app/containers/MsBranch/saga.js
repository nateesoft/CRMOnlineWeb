import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';
import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

export function* loadProfile() {
  try {
    const email = JSON.parse(getCookie('token')||'');
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/member/${email}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    if (response.status === 'Success') {
      yield put(actions.loadProfileSuccess(response.data));
    } else {
      yield put(actions.loadProfileError('Cannot load profile data'));
    }
  } catch (err) {
    yield put(actions.loadProfileError(err));
  }
}

export function* initLoad() {
  try {
    const requestURL = `${appConstants.publicPath}/api/branch`;
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

export function* saveData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/branch`;
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.status===200) {
      yield put(actions.createItemSuccess(response));
    } else {
      yield put(actions.createItemError('Cannot create data'));
    }
  } catch (err) {
    yield put(actions.createItemError(err));
  }
}

export function* updateData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/branch/${data.uuid_index}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (response.status===200) {
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
    const requestURL = `${appConstants.publicPath}/api/branch/${data.uuid_index}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'DELETE',
      body: JSON.stringify(data),
    });
    if (response.status===200) {
      yield put(actions.deleteItemSuccess(response));
    } else {
      yield put(actions.deleteItemError('Cannot update data'));
    }
  } catch (err) {
    yield put(actions.deleteItemError(err));
  }
}

export default function* msBranchSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
  yield takeEvery(constants.CREATE_ITEM, saveData);
  yield takeEvery(constants.UPDATE_ITEM, updateData);
  yield takeEvery(constants.DELETE_ITEM, deleteData);
  yield takeEvery(constants.LOAD_PROFILE, loadProfile);
}
