/* eslint-disable no-param-reassign */

const { reduce } = require('lodash');
const typography = require('@tailwindcss/typography');
const { fontFamily, colors, breakpoints } = require('./theme/src/theme');

// Add px unit to all breakpoint values.
const screens = reduce(
  breakpoints,
  (result, value, key) => {
    result[key] = `${value}px`;
    return result;
  },
  {},
);

function pixelsToRem(value) {
  return `${value / 16}rem`;
}

module.exports = {
  mode: 'jit',
  darkMode: 'media',
  purge: ['./theme/src/**/*.{mdx,tsx,scss}', './pages/**/*.tsx'],
  plugins: [typography],
  theme: {
    screens,
    extend: {
      fontFamily: {
        barlow: fontFamily,
      },

      spacing: {
        // Use 25px and 50px for margins, paddings, gaps, etc.
        6: pixelsToRem(25),
        12: pixelsToRem(50),
      },

      colors: {
        'napari-primary': colors.primary,
        'napari-deep-blue': colors.deepBlue,
        'napari-hover': colors.hover,
        'napari-hover-gray': colors.hoverGray,
        'napari-light': colors.light,
        'napari-error': colors.error,
        'napari-gray': colors.gray,
        'napari-dark-gray': colors.darkGray,
      },

      width: (theme) => ({
        'napari-min-width': theme('screens.screen-300'),
        'napari-col': '225px',
      }),

      height: {
        'napari-app-bar': '75px',
      },

      gridTemplateColumns: (theme) => {
        const width = theme('width.napari-col');
        const columns = [2, 3, 4, 5];

        return columns.reduce(
          // Add `repeat(225px, $column)` for each column
          (result, count) => {
            result[`napari-${count}`] = `repeat(${count}, ${width})`;
            return result;
          },

          {},
        );
      },

      maxWidth: (theme) => theme('width'),
      minWidth: (theme) => theme('width'),
      minHeight: (theme) => theme('height'),
    },
  },
};
