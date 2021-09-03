import * as fromFont from './font.actions';

describe('fontFonts', () => {
  it('should return an action', () => {
    expect(fromFont.fontFonts().type).toBe('[Font] Font Fonts');
  });
});
