import { actionTypes, actions } from '../../src/actions';

describe('Select KPI Buttons', () => {
  test('returns an action with type `DATA CONNECTING`', () => {
    const expectedAction = {
      type: actionTypes.DATA_CONNECTING,
      payload: true
    };
    expect(actions.dataConnecting(true)).toEqual(expectedAction);
  });
});
