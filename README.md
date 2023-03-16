# Qitmeer BMS：支持Qitmeer官网服务的后台管理系统

## 对开发者的话

建议安装prettier的插件来格式化代码以通过eslint检查。

## 项目安装

```shell
npm install --legacy-peer-deps
```

### 用于开发的编译和热重载

```shell
npm run serve
```

### 用于生产的编译

```shell
npm run build
```

### 使用eslint检查并修复文件

```shell
npm run lint
```

## 项目结构介绍

```
├── public                      # 静态资源
│   │── favicon.ico             # favicon图标
│   └── index.html              # html模板
├── src                         # 源代码
│   ├── api                     # 所有请求
│   ├── assets                  # 主题 字体等静态资源
│   ├── components              # 全局公用组件
│   ├── constant                # 常量文件
│   ├── i18n                    # 国际化 language
│   ├── icons                   # 项目所有 svg icons
│   ├── layout                  # 全局 layout
│   ├── router                  # 路由
│   ├── plugins                 # 插件
│   ├── store                   # 全局 store管理
│   ├── styles                  # 全局样式
│   ├── utils                   # 全局公用方法
│   ├── views                   # views 所有页面
│   ├── App.vue                 # 入口页面
│   ├── main.js                 # 入口文件 加载组件 初始化等
│   └── permission.js           # 权限管理
├── .browserslistrc             
├── .editorconfig
├── .env.xxx                    # 环境变量配置
├── .eslintrc.js                # eslint 配置项
├── .gitignore
├── .prettierrc                 # prettier插件配置
├── babel.config.js
├── jsconfig.json
├── package.json
├── package-lock.json
└── vue.config.js               # vue-cli 配置
```

## 后台路由设计

```
├── dashboard                   # 首页（仪表盘概览）
├── login                       # 登录页（未登录时直接跳转至登录页，登录时直接跳转首页）
├── profile                     # 个人中心
│   │── information             # 个人信息
│   │── message                 # 消息管理
├── system                      # 系统管理
│   │── user                    # 用户管理
│   │── role                    # 角色管理（配合角色权限重新设计账户系统）
│   │── menu                    # 菜单管理（配合角色权限重新设计账户系统）
│   │── dept                    # 部门管理（配合角色权限重新设计账户系统）
├── business                    # 业务内容管理
│   │── new                     # 社区动态
│   │   │── list                # 社区动态列表
│   │   │── edit                # 社区动态编辑
│   │   └── detail              # 社区动态详情
│   │── article                 # 图书馆文章
│   │   │── list                # 图书馆文章列表
│   │   │── edit                # 图书馆文章编辑
│   │   └── detail              # 图书馆文章详情
│   │── faq                     # 常见问题
│   │── official-account        # 官方账户
│   │── proposal                # 用户提案（预留，暂时无相关操作）
│   │── ticket                  # 反馈工单
│   │── grant                   # 生态基金申请（预留，暂时无相关操作）
│   │── bounty                  # 赏金系统（预留，暂时无相关操作）
├── activity                    # 活动管理（预留，暂时无相关操作）
│   │── staking                 # 锁仓数据
│   │── charity                 # 慈善活动
├── monitor                     # 系统监控
│   │── server                  # 服务器监控
│   │── online-user             # 在线用户
│   │── opt-log                 # 操作日志
│   │── err-log                 # 异常日志
├── tools                       # 常用工具
│   │── send-msg                # 群发消息
│   │── send-mail               # 群发邮件
│   │── send-transaction        # 批量转账
│   │── block-browser           # 浏览器（外链）
│   │── testnet-faucet          # 水龙头（外链）
└── resource                    # 资源管理
```

