/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeEvery } from 'redux-saga/effects';
import msProductSaga, { initLoad, saveData, updateData, deleteData } from '../saga';
import * as constants from '../constants';

const generator = msProductSaga();

describe('msProductSaga Saga', () => {
  it('should start task to watch for INIT_LOAD', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeEvery(constants.INIT_LOAD, initLoad));
  });
  it('should start task to watch for CREATE_ITEM', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeEvery(constants.CREATE_ITEM, saveData));
  });
  it('should start task to watch for UPDATE_ITEM', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeEvery(constants.UPDATE_ITEM, updateData));
  });
  it('should start task to watch for DELETE_ITEM', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeEvery(constants.DELETE_ITEM, deleteData));
  });
});
