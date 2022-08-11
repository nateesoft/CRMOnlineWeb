import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';

import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

const fetch = require('node-fetch');
const apiServiceHost = appConstants.apiUploadServiceHost;

export function* saveDataImport() {
  try {
    const productImports = yield select(selectors.makeSelectProductImport());
    const productImportHeaders = yield select(selectors.makeSelectProductImportHeader());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/product/save_list`;
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({
        headers: productImportHeaders,
        data: productImports,
      }),
    });
    yield put(actions.saveDataImportSuccess(response));
  } catch (err) {
    yield put(actions.saveDataImportError(err));
  }
}

export function* initLoad() {
  try {
    const requestURL = `${appConstants.publicPath}/api/product`;
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
    let imagePath = '';
    if (file) {
      imagePath = `/images/${file.name}`;
    }
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/product`;
    const response = yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({ ...data, img_path: imagePath }),
    });
    yield put(actions.createItemSuccess(response));
  } catch (err) {
    yield put(actions.createItemError(err));
  }
}

export function* updateData() {
  try {
    const data = yield select(selectors.makeSelectForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/product`;
    const response = yield call(request, requestURL, {
      database,
      method: 'PUT',
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
    const requestURL = `${appConstants.publicPath}/api/product/${data.uuid_index}`;
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

export function* loadProductGroupList() {
  try {
    const requestURL = `${appConstants.publicPath}/api/product_group`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadProductGroupListSuccess(response.data));
  } catch (err) {
    yield put(actions.loadProductGroupListError(err));
  }
}

export function* loadStockList() {
  try {
    const requestURL = `${appConstants.publicPath}/api/stock`;
    const database = getCookie('database');
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadStockListSuccess(response.data));
  } catch (err) {
    yield put(actions.loadStockListError(err));
  }
}

export function* searchItem({ payload }) {
  const { key, value } = payload;
  try {
    const requestURL = `${appConstants.publicPath}/api/product/search`;
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

export default function* msProductSaga() {
  yield takeEvery(constants.INIT_LOAD, initLoad);
  yield takeEvery(constants.CREATE_ITEM, saveData);
  yield takeEvery(constants.UPDATE_ITEM, updateData);
  yield takeEvery(constants.DELETE_ITEM, deleteData);
  yield takeEvery(constants.DELETE_ITEM, initLoad);
  yield takeEvery(constants.UPLOAD_IMG, uploadFile);
  yield takeEvery(constants.SAVE_DATA_IMPORT, saveDataImport);
  yield takeEvery(constants.INIT_LOAD, loadProductGroupList);
  yield takeEvery(constants.INIT_LOAD, loadStockList);
  yield takeEvery(constants.SEARCH, searchItem);
}
