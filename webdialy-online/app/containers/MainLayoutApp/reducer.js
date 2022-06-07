/*
 *
 * MainLayoutApp reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  leftMenu: [],
  profile: {},
};

/* eslint-disable default-case, no-param-reassign */
const mainLayoutAppReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_PROFILE:
        break;
      case constants.LOAD_PROFILE_SUCCESS:
        draft.profile = action.payload;
        break;
      case constants.LOAD_PROFILE_ERROR:
        draft.error = action.payload;
        break;
    }
  });

export default mainLayoutAppReducer;
