module.exports = {
  root: true,
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  "settings": {
    "import/resolve": {
      "extensions": [ ".js", ".vue" ]
    },
    "import/parser": "babel-eslint"
  },
  // add your custom rules here
  'rules': {
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
    "comma-dangle": [2, "never"],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
