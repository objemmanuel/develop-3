import layout from '@/layout'

export default {
  path: '/system',
  component: layout,
  redirect: '/system/user',
  meta: {
    title: 'system',
    icon: 'personnel'
  },
  children: [
    {
      path: '/system/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "system" */ '@/views/system/user'),
      meta: {
        title: 'user',
        icon: 'tree'
      }
    }, {
      path: '/system/role',
      name: 'role',
      component: () => import(/* webpackChunkName: "system" */ '@/views/system/role'),
      meta: {
        title: 'role',
        icon: 'tree'
      }
    },
    {
      path: '/system/menu',
      name: 'menu',
      component: () => import(/* webpackChunkName: "system" */ '@/views/system/menu'),
      meta: {
        title: 'menu',
        icon: 'tree'
      }
    }, {
      path: '/system/dept',
      name: 'dept',
      component: () => import(/* webpackChunkName: "system" */ '@/views/system/dept'),
      meta: {
        title: 'dept',
        icon: 'tree'
      }
    }
  ]
}
