import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkout state domain
 */

export const selectCheckoutDomain = state => state.checkout || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Checkout
 */

export const makeSelectCheckout = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate,
  );

export const makeSelectCarts = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.cartList,
  );
export const makeSelectCartsNo = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.cart_no,
  );
export const makeSelectProduct = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.product,
  );
export const makeSelectMemberCode = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.member_code,
  );
export const makeSelectMemberShipping = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.memberShipping,
  );
export const makeSelectFileUpload = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.img_upload,
  );
export const makeSelectPaymentData = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.paymentData,
  );
export const makeSelectSlipFile = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.slipFileName,
  );
export const makeSelectSlipValidateStatus = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.slipValidateStatus,
  );
export const makeSelectAddressForm = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.addressForm,
  );
export const makeSelectSlipPath = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.slipPath,
  );
export const makeSelectResponse = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.response,
  );
export const makeSelectBranch = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.branch,
  );
export const makeSelectBranchList = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.branchList,
  );

export const makeShowImage = () =>
  createSelector(
    selectCheckoutDomain,
    substate => substate.response.status,
  );
