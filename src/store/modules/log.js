import { getDau, getMau } from '@/api/log'

export default {
  namespaced: true,
  state: () => ({
  }),
  mutations: {
  },
  actions: {
    /**
     * 获取日活数据
     * Get daily active data
     */
    async getDau(context) {
      const res = getDau()
      return res
    },
    /**
     * 获取月活数据
     * Get monthly live data
     */
    async getMau(context) {
      const res = getMau()
      return res
    }
  }
}
