/**
 * Shared module for Tailwind and Material UI. This is written in JS so that the
 * Tailwind config can import it in a Node.js environment.
 */

const createTheme = require('@material-ui/core/styles/createTheme').default;

const colors = {
  primary: '#80d1ff',
  deepBlue: '#009BF2',
  hover: '#98daff',
  hoverGray: '#f7f7f7',
  gray: '#6f6f6f',
  darkGray: '#686868',
  light: '#d2efff',
  error: '#eb1000',
};

const breakpoints = {
  // Special screen size for fresnel when using `lessThan` queries.
  zero: 0,
  'screen-300': 300,
  'screen-495': 495,
  'screen-875': 875,
  'screen-900': 900,
  'screen-1150': 1150,
  'screen-1425': 1425,
};

const fontFamily = ['Barlow', 'sans-serif'];

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.light,
      error: colors.error,
    },
  },

  shape: {
    // Disable rounded borders for buttons, dialogs, etc.
    borderRadius: 0,
  },

  typography: {
    fontFamily: fontFamily.join(','),
    button: {
      // Remove uppercase styling from buttons
      textTransform: 'none',
    },
  },
});

module.exports = {
  breakpoints,
  colors,
  fontFamily,
  theme,
};
