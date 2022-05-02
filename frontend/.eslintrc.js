module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 'plugin:vue/essential',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
}
