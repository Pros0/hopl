import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { FONT_SANS, HEADING_FONT_WEIGHT } from './fonts';
import {
  HOPL_GREEN,
  HOPL_YELLOW,
  HOPL_BROWN,
  HOPL_CERISE,
  HOPL_PAPAYA,
} from './colors';

export default responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: FONT_SANS,
      h1: {
        fontWeight: HEADING_FONT_WEIGHT,
      },
      h2: {
        fontWeight: HEADING_FONT_WEIGHT,
      },
      h3: {
        fontWeight: HEADING_FONT_WEIGHT,
      },
      h4: {
        fontWeight: HEADING_FONT_WEIGHT,
      },
      h5: {
        fontWeight: HEADING_FONT_WEIGHT,
      },
      subtitle1: {
        fontWeight: 700,
      },
      subtitle2: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 600,
      },
    },
    palette: {
      primary: HOPL_GREEN,
      secondary: HOPL_YELLOW,
      thirdary: HOPL_BROWN,
      fourthary: HOPL_CERISE,
      offBackground: HOPL_PAPAYA,
    },
    shape: {
      borderRadius: 4,
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 24,
          height: 48,
        },
      },
    },
  }),
);
