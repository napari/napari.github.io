const { execSync } = require('child_process');
const { resolve } = require('path');

if (![process.env.NODE_ENV, process.env.THEME_ENV].includes('production')) {
  execSync('husky install', {
    cwd: resolve(__dirname, '../../../..'),
    stdio: 'inherit',
  });
}
