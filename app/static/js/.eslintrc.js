module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2017 // This specifies ES8 (ECMAScript 2017) support
    },
    extends: 'eslint:recommended',
    rules: {
        //custom_rules
    },
};