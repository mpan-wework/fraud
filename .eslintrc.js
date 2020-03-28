module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['react-app', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'es5',
        bracketSpacing: true,
        arrowParens: 'always',
        requirePragma: false,
        insertPragma: false,
        vueIndentScriptAndStyle: false,
        endOfLine: 'auto',
      },
    ],
  },
};
