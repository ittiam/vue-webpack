module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
    'comma-dangle': ['error', 'never'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'allow',
    'no-console': process.env.NODE_ENV === 'production'
      ? { allow: ['warn', 'error'] }
      : 'allow',
    // the maximum depth callbacks can be nested
    'max-nested-callbacks': ['error', 3],
    // limits the number of parameters that can be used in the function declaration.
    'max-params': ['error', 5],
    // limit cyclomatic complexity
    complexity: ['error', 10],
    // require or disallow space before function opening parenthesis
    'space-before-function-paren': ['error', 'never'],
    // require parens in arrow function arguments
    'arrow-parens': ['error', 'as-needed'],
    // disallow usage of expressions in statement position
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: false,
        allowTaggedTemplates: false
      }
    ],
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.vue']
      }
    }
  }
};
