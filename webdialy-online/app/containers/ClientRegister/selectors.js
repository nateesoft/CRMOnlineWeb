import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clientRegister state domain
 */

const selectClientRegisterDomain = state => state.clientRegister || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClientRegister
 */

const makeSelectClientRegister = () =>
  createSelector(
    selectClientRegisterDomain,
    substate => substate,
  );

export default makeSelectClientRegister;
export { selectClientRegisterDomain };
