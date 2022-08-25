/*
 *
 * ClientRegister reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  dbList: [],
  response: {},
};

/* eslint-disable default-case, no-param-reassign */
const clientRegisterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.INIT_LOAD:
        break;
      case constants.INIT_LOAD_SUCCESS:
        draft.dbList = action.payload;
        break;
      case constants.INIT_LOAD_ERROR:
        draft.response.status = 'Error';
        draft.response.message = 'Load data error!';
        break;
    }
  });

export default clientRegisterReducer;
