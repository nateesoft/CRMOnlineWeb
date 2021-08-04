import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the msProductGroup state domain
 */

export const selectMsProductGroupDomain = state => state.msProductGroup || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MsProductGroup
 */

export const makeSelectMsProductGroup = () =>
  createSelector(
    selectMsProductGroupDomain,
    substate => substate,
  );

export const makeSelectCurrentId = () =>
  createSelector(
    selectMsProductGroupDomain,
    substate => substate.currentId,
  );
export const makeSelectPage = () =>
  createSelector(
    selectMsProductGroupDomain,
    substate => substate.page,
  );
export const makeSelectListItems = () =>
  createSelector(
    selectMsProductGroupDomain,
    substate => substate.list,
  );
export const makeSelectForm = () =>
  createSelector(
    selectMsProductGroupDomain,
    substate => substate.data,
  );
export const makeSelectResponse = () =>
  createSelector(
    selectMsProductGroupDomain,
    substate => substate.response,
  );
