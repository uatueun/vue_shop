module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],

    parserOptions: {
        parser: 'babel-eslint'
    },

    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'space-before-function-paren': 0,
      'no-unused-vars': 0,
      'vue/no-unused-vars': 'off'
    },

    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ]
}