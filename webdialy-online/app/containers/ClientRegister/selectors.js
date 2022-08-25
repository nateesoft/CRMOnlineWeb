import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clientRegister state domain
 */

export const selectClientRegisterDomain = state => state.clientRegister || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClientRegister
 */

export const makeSelectClientRegister = () =>
  createSelector(
    selectClientRegisterDomain,
    substate => substate,
  );

export const makeSelectDBListItems = () =>
  createSelector(
    selectClientRegisterDomain,
    substate => substate.dbList,
  );
