module.exports = {
  env: {
    'vue/setup-compiler-macros': true
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'standard'
  ],
  plugins: ['vue'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 3,
        multiline: 3
      }
    ],
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'h3', 'a']
      }
    ]
  }
}
