import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
import BusinessRouter from './modules/Business'
import ActivityRouter from './modules/Activity'
import MonitorRouter from './modules/Monitor'
import ToolsRouter from './modules/Tools'
import ProfileRouter from './modules/Profile'
import SystemRouter from './modules/System'
/**
 * 私有路由表
 */
export const privateRoutes = [
  ProfileRouter,
  SystemRouter,
  BusinessRouter,
  ActivityRouter,
  MonitorRouter,
  ToolsRouter
]

/**
 * 公开路由表
 * public routing table
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
        meta: {
          title: 'dashboard',
          icon: 'personnel'
        }
      }, {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/404')
      }, {
        path: '/401',
        name: '401',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/401')
      }
    ]
  },
  ProfileRouter,
  SystemRouter,
  BusinessRouter,
  ActivityRouter,
  MonitorRouter,
  ToolsRouter
]

const router = createRouter({
  history:
    process.env.NODE_ENV === 'production'
      ? createWebHistory()
      : createWebHashHistory(),
  routes: publicRoutes
})

export default router
