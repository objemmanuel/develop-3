# Qitmeer-BMS: A backstage management system supporting the service of qitmeer official website

## For developer

It is recommended that you install the prettier plug-in to help you format the code to pass the eslint check.

## Project setup

```shell
npm install --legacy-peer-deps
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

### Lints and fixes files

```shell
npm run lint
```


## Project Structure

```
├── public                      
│   │── favicon.ico             # favicon icon
│   └── index.html              
├── src                         
│   ├── api                     
│   ├── assets                  # Static resources such as theme fonts
│   ├── components              # Global Common Components
│   ├── constant
│   ├── i18n                    # language setting
│   ├── icons
│   ├── layout
│   ├── router
│   ├── plugins
│   ├── store
│   ├── styles
│   ├── utils 
│   ├── views
│   ├── App.vue
│   ├── main.js
│   └── permission.js
├── .browserslistrc             
├── .editorconfig
├── .env.xxx                    # Environment variable configuration
├── .eslintrc.js
├── .gitignore
├── .prettierrc                 # Prettier plug-in configuration
├── babel.config.js
├── jsconfig.json
├── package.json
├── package-lock.json
└── vue.config.js 
```

## Route Design

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



