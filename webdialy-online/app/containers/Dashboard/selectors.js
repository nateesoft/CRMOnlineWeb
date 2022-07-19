import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

export const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

export const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate,
  );
export const makeSelectRedeem = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.redeem,
  );
export const makeSelectRedeemPoint = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.redeemPoint,
  );
export const makeSelectPromotionValid = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.promotionValid,
  );
