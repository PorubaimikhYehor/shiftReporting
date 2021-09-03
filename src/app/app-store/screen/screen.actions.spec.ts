import * as fromScreen from './screen.actions';

describe('loadScreens', () => {
  it('should return an action', () => {
    expect(fromScreen.loadScreens().type).toBe('[Screen] Load Screens');
  });
});
