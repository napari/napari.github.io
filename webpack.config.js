const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

function getStyleLoader(type) {
  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    type === 'scss' && 'sass-loader',
  ].filter(Boolean);

  return loaders;
}

module.exports = {
  context: resolve(__dirname, 'theme'),
  mode: isProd ? 'production' : 'development',

  entry: {
    main: './js/main.js',
  },

  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'theme/napari/static/dist'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: getStyleLoader('scss'),
      },
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],

  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
  },
};
