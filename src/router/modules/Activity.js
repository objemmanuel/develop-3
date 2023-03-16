import layout from '@/layout'

export default {
  path: '/activity',
  component: layout,
  redirect: '/activity/staking',
  meta: {
    title: 'activity',
    icon: 'personnel'
  },
  children: [
    {
      path: '/activity/staking',
      name: 'staking',
      component: () => import(/* webpackChunkName: "activity" */ '@/views/activity/staking'),
      meta: {
        title: 'staking',
        icon: 'tree'
      }
    }, {
      path: '/activity/charity',
      name: 'charity',
      component: () => import(/* webpackChunkName: "activity" */ '@/views/activity/charity'),
      meta: {
        title: 'charity',
        icon: 'tree'
      }
    }
  ]
}
