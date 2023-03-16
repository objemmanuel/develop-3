import { login, getUserInfo } from '@/api/sys'
import { getDnu, getDtu, getMnu, getMtu, getUserCount } from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { TOKEN, USER_INFO, TARGET, TIME_STAMP } from '@/constant'
import { setTimeStamp } from '@/utils/auth'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: getItem(USER_INFO) || {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem(USER_INFO, userInfo)
    }
  },
  actions: {
    /**
     * 处理用户登录
     * Process user login
     */
    login(context, userInfo) {
      const { username, password, rememberMe, code, uuid } = userInfo
      return new Promise((resolve, reject) => {
        if (rememberMe) {
          // TODO 处理记住用户
          console.log('remember me')
        }
        login({
          username,
          password,
          code,
          uuid
        })
          .then((res) => {
            this.commit('user/setToken', res.token)
            this.commit('user/setUserInfo', res.user)
            setTimeStamp()
            if (store.getters.isAdmin) {
              if (store.getters.target && store.getters.hasTarget) {
                const target = getItem(TARGET)
                store.commit('app/setLastTargetUrl', '')
                router.push(target)
              } else {
                router.push('/')
              }
            } else {
              store.dispatch('user/logout')
              ElMessage.warning(i18n.global.t('msg.login.adminErr'))
            }
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息
     * Get user information
     */
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      if (!store.getters.isAdmin) {
        store.dispatch('user/logout')
        ElMessage.warning(i18n.global.t('msg.login.adminErr'))
      }
      return res
    },
    /**
     * 主动登出用户
     * Logout user
     */
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      this.commit('app/initTagsViewList')
      removeItem(TOKEN)
      removeItem(TIME_STAMP)
      removeItem(USER_INFO)
      router.push('/login')
    },
    /**
     * 获取每日新增用户数量
     * Get the number of new users per day
     */
    async getDnu(context) {
      const res = getDnu()
      return res
    },
    /**
     * 获取每日累计用户数量
     * Get the daily cumulative number of users
     */
    async getDtu(context) {
      const res = getDtu()
      return res
    },
    /**
     * 获取每月新增用户数量
     * Get the number of new users per month
     */
    async getMnu(context) {
      const res = getMnu()
      return res
    },
    /**
     * 获取每月累计用户数量
     * Get the monthly cumulative number of users
     */
    async getMtu(context) {
      const res = getMtu()
      return res
    },
    /**
     * 获取累计用户数量
     * Get the cumulative number of users
     */
    async getUserCount(context) {
      const res = getUserCount()
      return res
    }
  }
}
