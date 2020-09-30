import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the shopping state domain
 */

const selectShoppingDomain = state => state.shopping || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Shopping
 */

const makeSelectShopping = () =>
  createSelector(
    selectShoppingDomain,
    substate => substate,
  );

const makeSelectProductList = () =>
  createSelector(
    selectShoppingDomain,
    substate => substate.productList,
  );

export { makeSelectShopping, selectShoppingDomain, makeSelectProductList };
