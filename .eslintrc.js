module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'parserOptions': {
    sourceType: 'module'
  },
  'extends': 'airbnb-base',
  // required to lint *.vue files
  'plugins': [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
    'comma-dangle': [2, 'never'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // "no-console": 2,
    'max-statements': [2, 50],
    'max-depth': [2, 5],
    'max-nested-callbacks': [2, 3],
    'max-params': [2, 5],
    'complexity': [2, 10],
    'max-len': [2, 120, 4]
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.json', '.vue']
      }
    }
  }
}
