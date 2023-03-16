import layout from '@/layout'

export default {
  path: '/monitor',
  component: layout,
  redirect: '/monitor/server',
  meta: {
    title: 'monitor',
    icon: 'personnel'
  },
  children: [
    {
      path: '/monitor/server',
      name: 'server',
      component: () => import(/* webpackChunkName: "monitor" */ '@/views/monitor/server'),
      meta: {
        title: 'server',
        icon: 'tree'
      }
    }, {
      path: '/monitor/online-user',
      name: 'online-user',
      component: () => import(/* webpackChunkName: "monitor" */ '@/views/monitor/online-user'),
      meta: {
        title: 'onlineUser',
        icon: 'tree'
      }
    }, {
      path: '/monitor/opt-log',
      name: 'opt-log',
      component: () => import(/* webpackChunkName: "monitor" */ '@/views/monitor/opt-log'),
      meta: {
        title: 'optLog',
        icon: 'tree'
      }
    }, {
      path: '/monitor/err-log',
      name: 'err-log',
      component: () => import(/* webpackChunkName: "monitor" */ '@/views/monitor/err-log'),
      meta: {
        title: 'errLog',
        icon: 'tree'
      }
    }
  ]
}
