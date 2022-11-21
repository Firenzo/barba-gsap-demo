module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'error',
    'space-in-parens': 'off',
    'computed-property-spacing': 'off',
    'max-len': 'off',
    "indent": ['warn', 2],
  }
}
