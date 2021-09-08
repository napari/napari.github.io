/**
 * ESLint configuration copied over from the napari hub.
 */

const configs = {
  dev: require.resolve('./eslint/dev'),
  react: require.resolve('./eslint/react'),
  typescript: require.resolve('./eslint/typescript'),
};

module.exports = {
  root: true,
  extends: ['airbnb/base', 'prettier', configs.dev],
  plugins: ['simple-import-sort'],

  overrides: [
    // TypeScript scripts
    {
      files: ['*.ts', 'scripts/**/*.ts'],
      extends: [configs.typescript, configs.dev],
    },

    // TypeScript and React source code.
    {
      files: ['./theme/**/*.ts{,x}', './pages/**/*.ts{,x}', 'derp.ts'],
      extends: [configs.typescript, configs.react],
    },

    /*
      Disable explicit return types for TSX files. Prefer inferred return
      types for React components, hooks, and tests:
      https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript
    */
    {
      files: [
        './theme/**/*.tsx',
        './theme/**/*.hooks.ts',
        './theme/hooks/*.ts',
        './theme/**/hooks.ts',
        './theme/**/*.test.ts{,x}',
        './tests/**/*.ts',
        './pages/**/*.ts{,x}',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },

    /*
      Prefer default exports for Next.js pages and SCSS modules.

      Next.js routing needs the pages to be exported as default exports, and
      the team has no plans to add support for the time being:
      https://github.com/vercel/next.js/issues/7275

      SCSS modules export from the `default` export, so their type
      definitions are generated using `export default styles`.
    */
    {
      files: ['./theme/pages/**/*.ts{,x}', './pages/**/*.ts{,x}', '**/*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
  ],
};
