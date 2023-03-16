import layout from '@/layout'

export default {
  path: '/business',
  component: layout,
  redirect: '/business/new',
  meta: {
    title: 'business',
    icon: 'personnel'
  },
  children: [
    {
      path: '/business/new',
      name: 'new',
      redirect: '/business/new/list',
      meta: {
        title: 'new',
        icon: 'tree'
      },
      children: [
        {
          path: '/business/new/list',
          name: 'new-list',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/new/index'),
          meta: {
            title: 'newList',
            icon: 'tree'
          }
        },
        {
          path: '/business/new/detail/:id',
          name: 'new-detail-id',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/new/detail'),
          meta: {
            title: 'newDetail'
          }
        },
        {
          path: '/business/new/editor',
          name: 'new-editor',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/new/editor'),
          meta: {
            title: 'newEditor',
            icon: 'tree'
          }
        },
        {
          path: '/business/new/editor/:id',
          name: 'new-editor-id',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/new/editor'),
          meta: {
            title: 'newEditor'
          }
        }
      ]
    }, {
      path: '/business/article',
      name: 'article',
      redirect: '/business/article/list',
      meta: {
        title: 'article',
        icon: 'tree'
      },
      children: [
        {
          path: '/business/article/list',
          name: 'article-list',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/article/index'),
          meta: {
            title: 'articleList',
            icon: 'tree'
          }
        },
        {
          path: '/business/article/detail/:id',
          name: 'article-detail-id',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/article/detail'),
          meta: {
            title: 'articleDetail'
          }
        },
        {
          path: '/business/article/editor',
          name: 'article-editor',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/article/editor'),
          meta: {
            title: 'articleEditor',
            icon: 'tree'
          }
        },
        {
          path: '/business/article/editor/:id',
          name: 'article-editor-id',
          component: () => import(/* webpackChunkName: "business" */ '@/views/business/article/editor'),
          meta: {
            title: 'articleEditor'
          }
        }
      ]
    }, {
      path: '/business/faq',
      name: 'faq',
      component: () => import(/* webpackChunkName: "business" */ '@/views/business/faq'),
      meta: {
        title: 'faq',
        icon: 'tree'
      }
    }, {
      path: '/business/official-account',
      name: 'official-account',
      component: () => import(/* webpackChunkName: "business" */ '@/views/business/official-account'),
      meta: {
        title: 'officialAccount',
        icon: 'tree'
      }
    }, {
      path: '/business/proposal',
      name: 'proposal',
      component: () => import(/* webpackChunkName: "business" */ '@/views/business/proposal'),
      meta: {
        title: 'proposal',
        icon: 'tree'
      }
    }, {
      path: '/business/ticket',
      name: 'ticket',
      component: () => import(/* webpackChunkName: "business" */ '@/views/business/ticket'),
      meta: {
        title: 'ticket',
        icon: 'tree'
      }
    }, {
      path: '/business/grant',
      name: 'grant',
      component: () => import(/* webpackChunkName: "business" */ '@/views/business/grant'),
      meta: {
        title: 'grant',
        icon: 'tree'
      }
    }, {
      path: '/business/bounty',
      name: 'bounty',
      component: () => import(/* webpackChunkName: "business" */ '@/views/business/bounty'),
      meta: {
        title: 'bounty',
        icon: 'tree'
      }
    }
  ]
}
