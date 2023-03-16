import axios from 'axios'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
// Request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (isCheckTimeout()) {
        // token过期时退出登录
        // Log out when token expires
        store.dispatch('user/logout')
        ElMessage.warning(i18n.global.t('msg.request.tokenFailure'))
        return Promise.reject(new Error(i18n.global.t('msg.request.tokenFailure')))
      }
      // 非管理员不可使用后台管理系统
      // Non-administrators cannot use the background management system//Non-administrators cannot use the background management system
      if (!store.getters.hasUserInfo || !store.getters.isAdmin) {
        store.dispatch('user/logout')
        ElMessage.warning(i18n.global.t('msg.login.adminErr'))
      }
      // 让每个请求携带自定义token 请根据实际情况自行修改
      // Let each request carry a custom token
      config.headers.Authorization = store.getters.token
    }
    if (config.headers['Content-Type'] === undefined || config.headers['Content-Type'] === '') {
      config.headers['Content-Type'] = 'application/json'
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
// Response interceptor
service.interceptors.response.use(
  response => {
    const { status, msg, data } = response.data
    // 要根据success的成功与否决定下面的操作
    // The following actions should be determined based on the success of success
    if (status) {
      return data
    } else {
      // 业务错误
      // Business error
      const message = JSON.parse(msg)
      if (message.en) {
        if (store.getters.language === 'zh') {
          ElMessage.error(message.zh)
        } else {
          ElMessage.error(message.en)
        }
      } else {
        ElMessage.error(msg)
      }
      return Promise.reject(new Error(msg))
    }
  },
  error => {
    // 处理 token 超时问题
    // Handle the token timeout problem
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
