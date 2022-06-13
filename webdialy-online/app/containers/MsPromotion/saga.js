import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';

import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

const fetch = require('node-fetch');
const apiServiceHost = appConstants.serviceApiPath;

export function* initLoad() {
  try {
    const requestURL = `${appConstants.publicPath}/api/promotion`;
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

export function* saveData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const file = yield select(selectors.makeSelectFileUpload());
    let fileName = '';
    if (file && file.name) {
      fileName = file.name;
    }
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/promotion`;
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({ ...data, img_path: `/images/${fileName}` }),
    });
    yield put(actions.createItemSuccess(response));
  } catch (err) {
    yield put(actions.createItemError(err));
  }
}

export function* updateData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const file = yield select(selectors.makeSelectFileUpload());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/promotion`;
    let response;
    if (file) {
      response = yield call(request, requestURL, {
        database,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      response = yield call(request, requestURL, {
        database,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }
    yield put(actions.updateItemSuccess(response));
  } catch (err) {
    yield put(actions.updateItemError(err));
  }
}

export function* deleteData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/promotion/${data.uuid_index}`;
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

export function* uploadFile() {
  try {
    const file = yield select(selectors.makeSelectFileUpload());
    const formdata = new FormData();
    formdata.append('file', file, file.name);
    const options = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const response = yield fetch(`${apiServiceHost}/api/upload`, options).then(resp => resp.json());
    yield put(actions.uploadImageSuccess(response));
  } catch (err) {
    yield put(actions.uploadImageError(err));
  }
}

export default function* msPromotionSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
  yield takeEvery(constants.CREATE_ITEM, saveData);
  yield takeEvery(constants.UPDATE_ITEM, updateData);
  yield takeEvery(constants.DELETE_ITEM, deleteData);
  yield takeEvery(constants.UPLOAD_IMG, uploadFile);
}
