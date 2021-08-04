import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the msProduct state domain
 */

export const selectMsProductDomain = state => state.msProduct || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MsProduct
 */

export const makeSelectMsProduct = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate,
  );

export const makeSelectCurrentId = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.currentId,
  );
export const makeSelectPage = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.page,
  );
export const makeSelectListItems = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.list,
  );
export const makeSelectForm = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.data,
  );
export const makeSelectResponse = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.response,
  );
export const makeSelectFileUpload = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.img_upload,
  );
export const makeSelectProductImport = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.productImports,
  );
export const makeSelectProductImportHeader = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.productImportHeaders,
  );
export const makeSelectProductGroupList = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.product_group,
  );
export const makeSelectStockList = () =>
  createSelector(
    selectMsProductDomain,
    substate => substate.stock_list,
  );
