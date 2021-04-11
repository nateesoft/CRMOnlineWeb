import profileEditReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('profileEditReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      status: '',
      error: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(profileEditReducer(undefined, {})).toEqual(expectedResult);
  });
});
