/* eslint-disable no-param-reassign */

const { reduce } = require('lodash');
const typography = require('@tailwindcss/typography');
const breakpoints = require('./theme/src/breakpoints.json');

const colors = {
  primary: '#80d1ff',
  hover: '#98daff',
  hoverGray: '#f7f7f7',
  gray: '#6f6f6f',
  light: '#d2efff',
  error: '#eb1000',
};

const fontFamily = ['Barlow', 'sans-serif'];

module.exports = {
  breakpoints,
  colors,
  fontFamily,
};

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
  purge: ['./theme/src/**/*.{mdx,tsx,scss}'],
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
        'napari-hover': colors.hover,
        'napari-hover-gray': colors.hoverGray,
        'napari-light': colors.light,
        'napari-error': colors.error,
        'napari-gray': colors.gray,
      },

      width: {
        'napari-col': '225px',
      },

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
