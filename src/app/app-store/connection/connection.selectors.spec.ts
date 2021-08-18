import * as fromConnection from './connection.reducer';
import { connectionStatus } from './connection.selectors';

describe('Connection Selectors', () => {
  it('should select the feature state', () => {
    const result = connectionStatus({
      [fromConnection.connectionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
