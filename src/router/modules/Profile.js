import layout from '@/layout'

export default {
  path: '/profile',
  component: layout,
  redirect: '/profile/information',
  meta: {
    title: 'profile',
    icon: 'personnel'
  },
  children: [
    {
      path: '/profile/information',
      name: 'information',
      component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/information'),
      meta: {
        title: 'information',
        icon: 'tree'
      }
    }, {
      path: '/profile/message',
      name: 'message',
      component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/message'),
      meta: {
        title: 'message',
        icon: 'tree'
      }
    }
  ]
}
