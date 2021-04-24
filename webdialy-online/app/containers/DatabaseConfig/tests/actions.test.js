import * as actions from '../actions';
import * as constants from '../constants';

describe('DatabaseConfig actions', () => {
  describe('initState Action', () => {
    it('has a type of INIT_STATE', () => {
      const expected = {
        type: constants.INIT_STATE,
      };
      expect(actions.initState()).toEqual(expected);
    });
  });
  describe('changePage Action', () => {
    it('has a type of CHANGE_PAGE', () => {
      const expected = {
        type: constants.CHANGE_PAGE,
        payload: 'init'
      };
      expect(actions.changePage('init')).toEqual(expected);
    });
  });
  describe('initLoad Action', () => {
    it('has a type of INIT_LOAD', () => {
      const expected = {
        type: constants.INIT_LOAD,
        payload: 'init'
      };
      expect(actions.initLoad('init')).toEqual(expected);
    });
  });
  describe('initLoadSuccess Action', () => {
    it('has a type of INIT_LOAD_SUCCESS', () => {
      const expected = {
        type: constants.INIT_LOAD_SUCCESS,
        payload: 'success'
      };
      expect(actions.initLoadSuccess('success')).toEqual(expected);
    });
  });
  describe('initLoadError Action', () => {
    it('has a type of INIT_LOAD_ERROR', () => {
      const expected = {
        type: constants.INIT_LOAD_ERROR,
        payload: 'error'
      };
      expect(actions.initLoadError('error')).toEqual(expected);
    });
  });
  describe('loadEdit Action', () => {
    it('has a type of LOAD_EDIT', () => {
      const expected = {
        type: constants.LOAD_EDIT,
        payload: 'init'
      };
      expect(actions.loadEdit('init')).toEqual(expected);
    });
  });
  describe('loadEditSuccess Action', () => {
    it('has a type of LOAD_EDIT_SUCCESS', () => {
      const expected = {
        type: constants.LOAD_EDIT_SUCCESS,
        payload: 'success'
      };
      expect(actions.loadEditSuccess('success')).toEqual(expected);
    });
  });
  describe('loadEditError Action', () => {
    it('has a type of LOAD_EDIT_ERROR', () => {
      const expected = {
        type: constants.LOAD_EDIT_ERROR,
        payload: 'error'
      };
      expect(actions.loadEditError('error')).toEqual(expected);
    });
  });
  describe('loadView Action', () => {
    it('has a type of LOAD_VIEW', () => {
      const expected = {
        type: constants.LOAD_VIEW,
        payload: 'init'
      };
      expect(actions.loadView('init')).toEqual(expected);
    });
  });
  describe('loadViewSuccess Action', () => {
    it('has a type of LOAD_VIEW_SUCCESS', () => {
      const expected = {
        type: constants.LOAD_VIEW_SUCCESS,
        payload: 'success'
      };
      expect(actions.loadViewSuccess('success')).toEqual(expected);
    });
  });
  describe('loadViewError Action', () => {
    it('has a type of LOAD_VIEW_ERROR', () => {
      const expected = {
        type: constants.LOAD_VIEW_ERROR,
        payload: 'error'
      };
      expect(actions.loadViewError('error')).toEqual(expected);
    });
  });
  describe('createItem Action', () => {
    it('has a type of CREATE_ITEM', () => {
      const expected = {
        type: constants.CREATE_ITEM,
        payload: 'init'
      };
      expect(actions.createItem('init')).toEqual(expected);
    });
  });
  describe('createItemSuccess Action', () => {
    it('has a type of CREATE_ITEM_SUCCESS', () => {
      const expected = {
        type: constants.CREATE_ITEM_SUCCESS,
        payload: 'success'
      };
      expect(actions.createItemSuccess('success')).toEqual(expected);
    });
  });
  describe('createItemError Action', () => {
    it('has a type of CREATE_ITEM_ERROR', () => {
      const expected = {
        type: constants.CREATE_ITEM_ERROR,
        payload: 'error'
      };
      expect(actions.createItemError('error')).toEqual(expected);
    });
  });
  describe('updateItem Action', () => {
    it('has a type of UPDATE_ITEM', () => {
      const expected = {
        type: constants.UPDATE_ITEM,
        payload: 'init'
      };
      expect(actions.updateItem('init')).toEqual(expected);
    });
  });
  describe('updateItemSuccess Action', () => {
    it('has a type of UPDATE_ITEM_SUCCESS', () => {
      const expected = {
        type: constants.UPDATE_ITEM_SUCCESS,
        payload: 'success'
      };
      expect(actions.updateItemSuccess('success')).toEqual(expected);
    });
  });
  describe('updateItemError Action', () => {
    it('has a type of UPDATE_ITEM_ERROR', () => {
      const expected = {
        type: constants.UPDATE_ITEM_ERROR,
        payload: 'error'
      };
      expect(actions.updateItemError('error')).toEqual(expected);
    });
  });
  describe('deleteItem Action', () => {
    it('has a type of DELETE_ITEM', () => {
      const expected = {
        type: constants.DELETE_ITEM,
        payload: 'init'
      };
      expect(actions.deleteItem('init')).toEqual(expected);
    });
  });
  describe('deleteItemSuccess Action', () => {
    it('has a type of DELETE_ITEM_SUCCESS', () => {
      const expected = {
        type: constants.DELETE_ITEM_SUCCESS,
        payload: 'success'
      };
      expect(actions.deleteItemSuccess('success')).toEqual(expected);
    });
  });
  describe('deleteItemError Action', () => {
    it('has a type of DELETE_ITEM_ERROR', () => {
      const expected = {
        type: constants.DELETE_ITEM_ERROR,
        payload: 'error'
      };
      expect(actions.deleteItemError('error')).toEqual(expected);
    });
  });
  describe('search Action', () => {
    it('has a type of SEARCH', () => {
      const expected = {
        type: constants.SEARCH,
        payload: 'init'
      };
      expect(actions.search('init')).toEqual(expected);
    });
  });
  describe('searchSuccess Action', () => {
    it('has a type of SEARCH_SUCCESS', () => {
      const expected = {
        type: constants.SEARCH_SUCCESS,
        payload: 'success'
      };
      expect(actions.searchSuccess('success')).toEqual(expected);
    });
  });
  describe('searchError Action', () => {
    it('has a type of SEARCH_ERROR', () => {
      const expected = {
        type: constants.SEARCH_ERROR,
        payload: 'error'
      };
      expect(actions.searchError('error')).toEqual(expected);
    });
  });
});
