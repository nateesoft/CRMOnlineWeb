import produce from 'immer';
import * as actions from '../actions';
import msProductReducer, { initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('msProductReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(msProductReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should handle the initState action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.list = [];
      draft.data = {};
      draft.page = 'LIST';
      draft.status = null;
      draft.message = null;
      draft.currentId = '';
      draft.response = {};
    });
    expect(msProductReducer(state, actions.initState())).toEqual(expectedResult);
  });
  it('should handle the changePage action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.page = 'page';
      draft.response.status = '';
      draft.response.message = '';
    });
    expect(msProductReducer(state, actions.changePage('page'))).toEqual(expectedResult);
  });
  it('should handle the initLoad action correctly', () => {
    const expectedResult = produce(state, () => {});
    expect(msProductReducer(state, actions.initLoad('page'))).toEqual(expectedResult);
  });
  it('should handle the initLoadSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.list = [];
    });
    expect(msProductReducer(state, actions.initLoadSuccess([]))).toEqual(expectedResult);
  });
  it('should handle the initLoadError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Error';
      draft.response.message = 'Load data error!';
    });
    expect(msProductReducer(state, actions.initLoadError())).toEqual(expectedResult);
  });
  it('should handle the loadEdit action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.data = 'data';
    });
    expect(msProductReducer(state, actions.loadEdit('data'))).toEqual(expectedResult);
  });
  it('should handle the loadEditSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.list = [];
    });
    expect(msProductReducer(state, actions.loadEditSuccess([]))).toEqual(expectedResult);
  });
  it('should handle the loadEditError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Error';
      draft.response.message = 'Load data to edit error!';
    });
    expect(msProductReducer(state, actions.loadEditError())).toEqual(expectedResult);
  });
  // it('should handle the createItem action correctly', () => {
  //   const expectedResult = produce(state, draft => {
  //     draft.data = 'data';
  //     draft.data.uuid_index = v4();
  //   });
  //   expect(msProductReducer(state, actions.createItem('data'))).toEqual(expectedResult);
  // });
  it('should handle the createItemSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Success';
      draft.response.message = 'Create item success';
    });
    expect(msProductReducer(state, actions.createItemSuccess())).toEqual(expectedResult);
  });
  it('should handle the createItemError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Error';
      draft.response.message = 'Create data error!';
    });
    expect(msProductReducer(state, actions.createItemError())).toEqual(expectedResult);
  });
  it('should handle the updateItem action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.data = 'data';
    });
    expect(msProductReducer(state, actions.updateItem('data'))).toEqual(expectedResult);
  });
  it('should handle the updateItemSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Success';
      draft.response.message = 'Update data success';
    });
    expect(msProductReducer(state, actions.updateItemSuccess())).toEqual(expectedResult);
  });
  it('should handle the updateItemError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Error';
      draft.response.message = 'Update data error!';
    });
    expect(msProductReducer(state, actions.updateItemError())).toEqual(expectedResult);
  });
  it('should handle the deleteItem action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.data.uuid_index = 'uuid_index';
    });
    expect(msProductReducer(state, actions.deleteItem('uuid_index'))).toEqual(expectedResult);
  });
  it('should handle the deleteItemError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Success';
      draft.response.message = 'Delete data success';
    });
    expect(msProductReducer(state, actions.deleteItemSuccess())).toEqual(expectedResult);
  });
  it('should handle the deleteItemError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.response.status = 'Error';
      draft.response.message = 'Delete data error!';
    });
    expect(msProductReducer(state, actions.deleteItemError())).toEqual(expectedResult);
  });
});
