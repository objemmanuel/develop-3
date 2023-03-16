import router from './router'
import store from './store'
import { isCheckTimeout } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
const language = computed(() => store.getters.language)
// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    document.documentElement.scrollTop = 0
  }
  // 快捷访问
  if (store.getters.token) {
    if (isCheckTimeout()) {
      // token过期时退出登录
      await store.dispatch('user/logout')
      console.log('Token 失效')
      // 没有token的情况下，可以进入白名单
      if (whiteList.indexOf(to.path) > -1) {
        next()
      } else {
        if (language.value === 'zh') {
          ElMessage.info('该页面需要登录方可访问，请先登录！')
        } else {
          ElMessage.info('This page needs to be logged in to access, please log in first!')
        }
        next('/login')
      }
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        // TODO 后端需要增加获取用户信息方法
        // await store.dispatch('user/getUserInfo')
      }
      if (to.path === '/login') {
        if (language.value === 'zh') {
          ElMessage.warning('您已登录，将为您直接跳转。')
        } else {
          ElMessage.warning('You have logged in and will jump directly for you.')
        }
        next('/')
      } else {
        next()
      }
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      if (language.value === 'zh') {
        ElMessage.warning('该页面需要登录方可访问，请先登录！')
      } else {
        ElMessage.warning('This page needs to be logged in to access, please log in first!')
      }
      next('/login')
    }
  }
})
