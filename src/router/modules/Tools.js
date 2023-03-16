import layout from '@/layout'

export default {
  path: '/tools',
  component: layout,
  redirect: '/tools/send-mail',
  meta: {
    title: 'tools',
    icon: 'personnel'
  },
  children: [
    {
      path: '/tools/send-mail',
      name: 'send-mail',
      component: () => import(/* webpackChunkName: "tools" */ '@/views/tools/send-mail'),
      meta: {
        title: 'sendMail',
        icon: 'tree'
      }
    }, {
      path: '/tools/send-msg',
      name: 'send-msg',
      component: () => import(/* webpackChunkName: "tools" */ '@/views/tools/send-msg'),
      meta: {
        title: 'sendMsg',
        icon: 'tree'
      }
    }, {
      path: '/tools/send-transaction',
      name: 'send-transaction',
      component: () => import(/* webpackChunkName: "tools" */ '@/views/tools/send-transaction'),
      meta: {
        title: 'sendTransaction',
        icon: 'tree'
      }
    }, {
      path: '/tools/block-browser',
      name: 'block-browser',
      meta: {
        url: 'https://www.baidu.com',
        title: 'blockBrowser',
        icon: 'tree'
      }
    }, {
      path: '/tools/testnet-faucet',
      name: 'testnet-faucet',
      meta: {
        url: 'https://testnet.qitmeer.io',
        title: 'testnetFaucet',
        icon: 'tree'
      }
    }
  ]
}
