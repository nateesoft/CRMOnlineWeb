import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getCookie } from 'react-use-cookie';

import request from 'utils/request';
import * as appConstants from 'containers/App/constants';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';
const fetch = require('node-fetch');

const { apiUploadServiceHost } = appConstants;

export function* loadCartList() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/carts/${cartNo}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadCartSuccess(response.data));
  } catch (err) {
    yield put(actions.loadCartError(err));
  }
}

export function* loadMemberShipping() {
  try {
    const { code: memberCode } = yield select(mainSelectors.makeSelectProfile());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/shipping/${memberCode}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    if (response.data.length > 0) {
      yield put(actions.loadMemberShippingSuccess(response.data[0]));
    } else {
      yield put(actions.loadMemberShippingSuccess({}));
    }
  } catch (err) {
    yield put(actions.loadMemberShippingError(err));
  }
}

export function* loadBranchList() {
  try {
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/branch`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    yield put(actions.loadBranchListSuccess(response.data));
  } catch (err) {
    yield put(actions.loadBranchListError(err));
  }
}

export function* uploadImage() {
  try {
    const file = yield select(selectors.makeSelectFileUpload());
    const formdata = new FormData();
    formdata.append('file', file, file.name);
    const options = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const response = yield fetch(`${apiUploadServiceHost}/api/upload`, options).then(resp =>
      resp.json(),
    );
    yield validateSlipUpload();
    yield onUpdateSlipPath();
    yield put(actions.uploadImageSuccess(response));
  } catch (err) {
    yield put(actions.uploadImageError(err));
  }
}

export function* validateSlipUpload() {
  try {
    const imgFile = yield select(selectors.makeSelectSlipFile());
    const requestURL = `${apiUploadServiceHost}/api/validate_slip`;
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ img_file: imgFile }),
    });
    yield put(actions.checkSlipSuccess(response.data));
  } catch (err) {
    yield put(actions.checkSlipError(err));
  }
}

export function* onDeleteItemCart() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const { product_code: productCode } = yield select(selectors.makeSelectProduct());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/carts_detail`;
    yield call(request, requestURL, {
      database,
      method: 'DELETE',
      body: JSON.stringify({ cart_no: cartNo, product_code: productCode }),
    });
    yield put(actions.deleteItemCartSuccess('Delete item success'));
  } catch (err) {
    yield put(actions.deleteItemCartError(err));
  }
}

export function* onUpdateItemCart() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const database = getCookie('database');
    const { product_code: productCode, qty } = yield select(selectors.makeSelectProduct());
    const requestURL = `${appConstants.publicPath}/api/carts_detail`;
    yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({ cart_no: cartNo, product_code: productCode, qty }),
    });
    yield put(actions.updateItemCartSuccess('Update item success'));
  } catch (err) {
    yield put(actions.updateItemCartError(err));
  }
}

export function* onUpdateAddressForm() {
  try {
    const { code: memberCode } = yield select(mainSelectors.makeSelectProfile());
    const addressFormData = yield select(selectors.makeSelectAddressForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/shipping`;
    const response = yield call(request, requestURL, {
      database,
      method: addressFormData.create === true ? 'POST' : 'PUT',
      body: JSON.stringify({ ...addressFormData, memberCode }),
    });
    yield put(actions.updateAddressFormSuccess(response));
  } catch (err) {
    yield put(actions.updateAddressFormError(err));
  }
}

export function* onUpdateCartsBranchShipping() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const { branch_shipping: branchShipping } = yield select(selectors.makeSelectAddressForm());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/carts/update-branch-shipping`;
    const response = yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({ cart_no: cartNo, branch_shipping: branchShipping || '' }),
    });
    yield put(actions.updateAddressFormSuccess(response));
  } catch (err) {
    yield put(actions.updateAddressFormError(err));
  }
}

export function* onUpdatePaymentForm() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const { code: memberCode } = yield select(mainSelectors.makeSelectProfile());
    const paymentData = yield select(selectors.makeSelectPaymentData());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/carts/payment`;
    yield call(request, requestURL, {
      database,
      method: 'POST',
      body: JSON.stringify({
        ...paymentData,
        member_code: memberCode,
        cart_no: cartNo,
      }),
    });
    yield put(actions.setPaymentDataSuccess());
  } catch (err) {
    yield put(actions.setPaymentDataError(err));
  }
}

export function* updateTransportAmt() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const { distance } = yield select(selectors.makeSelectPaymentData());
    const database = getCookie('database');
    const requestURL = `${appConstants.publicPath}/api/carts/payment-transport-amt`;
    yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({ cart_no: cartNo, distance }),
    });
    yield put(actions.updateTransportAmtSuccess());
  } catch (err) {
    yield put(actions.updateTransportAmtError(err));
  }
}

export function* onUpdateShoppingStep() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const requestURL = `${appConstants.publicPath}/api/carts/shopping_step`;
    const database = getCookie('database');
    yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({ cart_no: cartNo, shopping_step: 'wait_confirm' }),
    });
    yield put(actions.updateShoppingStepSuccess('Finish checkout order step'));
  } catch (err) {
    yield put(actions.updateShoppingStepError(err));
  }
}

export function* onUpdateSlipPath() {
  try {
    const cartNo = yield select(selectors.makeSelectCartsNo());
    const slipPath = yield select(selectors.makeSelectSlipPath());
    const requestURL = `${appConstants.publicPath}/api/carts/slip_path`;
    const database = getCookie('database');
    yield call(request, requestURL, {
      database,
      method: 'PATCH',
      body: JSON.stringify({
        cart_no: cartNo,
        slip_path: `/images/${slipPath}`,
      }),
    });
    yield put(actions.updateSlipPathSuccess('Update slip path success'));
  } catch (err) {
    yield put(actions.updateShoppingStepError(err));
  }
}

export function* loadBranchLocation() {
  try {
    const database = getCookie('database');
    const { branch_shipping: branchShipping } = yield select(selectors.makeSelectAddressForm());
    const requestURL = `${appConstants.publicPath}/api/branch/getcode/${branchShipping}`;
    const response = yield call(request, requestURL, {
      database,
      method: 'GET',
    });
    if (response.status === 200) {
      yield put(actions.loadBranchLocationSuccess(response.data[0]));
    } else {
      yield put(actions.loadBranchLocationError('Not found branch location'));
    }
  } catch (err) {
    yield put(actions.loadBranchLocationError(err));
  }
}

export default function* checkoutSaga() {
  yield takeEvery(constants.LOAD_CART, loadCartList);
  yield takeEvery(constants.LOAD_MEMBER_SHIPPING, loadMemberShipping);
  yield takeEvery(constants.LOAD_BRANCH_LIST, loadBranchList);
  yield takeEvery(constants.UPLOAD_IMG, uploadImage);
  yield takeEvery(constants.DELETE_ITEM_CART, onDeleteItemCart);
  yield takeEvery(constants.DELETE_ITEM_CART, loadCartList);
  yield takeEvery(constants.UPDATE_ITEM_CART, onUpdateItemCart);
  yield takeEvery(constants.UPDATE_ITEM_CART, loadCartList);
  yield takeEvery(constants.UPDATE_ADDRESS_FORM, onUpdateAddressForm);
  yield takeEvery(constants.UPDATE_ADDRESS_FORM, onUpdateCartsBranchShipping);
  yield takeEvery(constants.SET_PAYMENT_DATA, onUpdatePaymentForm);
  yield takeEvery(constants.UPDATE_SHOPPING_STEP, onUpdateShoppingStep);
  yield takeEvery(constants.UPDATE_ADDRESS_FORM, loadBranchLocation);
  yield takeEvery(constants.UPDATE_TRANSPORT_AMT, updateTransportAmt);
  yield takeEvery(constants.UPDATE_TRANSPORT_AMT, loadCartList);
}
