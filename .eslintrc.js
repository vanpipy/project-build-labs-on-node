// https://eslint.org/docs/user-guide/configuring

module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    amd: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // 不需要
    'generator-star-spacing': 'off', //生成器函数前后空格
    "no-unused-vars": 0,

    // 警告
    'no-new-object': 1, // 使用对象字面量创建对象

    // 错误
    'semi': ['error', 'always'],
    "indent": ['error', 4],
    "keyword-spacing": [2, {
      "overrides": {
          "if": {"after": true},
          "for": {"after": true},
          "while": {"after": true},
          "switch": {"after": true},
          "catch": {"after": true}
      }
    }],
    "key-spacing": [2, {"beforeColon": false, "afterColon": true, "mode": "strict"}],
    "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off', // 正式环境，禁止使用debugger
    "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'off', // 正式环境，禁止使用console
    "no-constant-condition": 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    "no-var": 2, // 避免使用var     2.2
    "no-dupe-args": 2, // 函数定义的时候不允许出现重复的参数    
    "no-dupe-keys": 2, // 对象中不允许出现重复的键
    "no-duplicate-case": 2, // switch语句中不允许出现重复的case标签
    "no-array-constructor": 2, // 使用字面量创建数组        4.1
    "template-curly-spacing": 2, // 以编程方式构建字符串时， 使用模板字符串代替字符串连接.      6.3
    "prefer-template": 2,
    "no-eval": 2, // 永远不要对字符串使用eval(),他产生无数的漏洞
    "no-useless-escape": 2, // 不要对字符串使用不必要的转义字符     6.5
    "func-style": 2, // 使用命名函数表达式而不是函数声明        7.1
    "prefer-rest-params": 2, // 永远不要使用 arguments，选择 rest 语法 ... 替代      7.6
    "no-new-func": 2, // 永远不要使用函数构造器去创建一个函数        7.10
    "space-before-blocks": 2, // 隔开函数签名Spacing in a function signature     7.11
    "space-before-function-paren": [2, {
      "anonymous": "always",
      "named": "never"
    }],
    "no-confusing-arrow": 2, // 避免使用比较运算符(&lt; =, &gt;=)时，混淆箭头函数语法(=&gt;)     8.5
    "no-useless-constructor": 2, // 如果没有指定，类有一个默认的构造函数。一个空的构造函数或者只是委托给父类则不是必须的     9.5
    "no-dupe-class-members": 2, // 避免重复类成员        9.6
    "no-duplicate-imports": 2, // 一个地方只在一个路径中 import(导入)     10.4
    "import/no-mutable-exports": 2, // 不要 export(导出) 可变绑定        10.5
    "import/prefer-default-export": 2, // 在只有单个导出的模块中，默认 export(导出) 优于命名 export(导出)        10.6
    "generator-star-spacing": 2, // 现在不要使用 generators (生成器)     11.2
    "comma-style": 2, // 行开头处不要实用使用逗号        20.1
    "camelcase": 2, // 当命名对象，函数和实例时使用驼峰式命名。      23.2
    "new-cap": 2, // 当命名构造函数或类的时候使用 PascalCase 式命名      23.3
    "space-in-parens": 2, // 强制在圆括号内使用一致的空格
    "import/no-extraneous-dependencies": [2, { devDependencies: true }],
    "max-len": 1,
  }
}
