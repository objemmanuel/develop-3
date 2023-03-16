import { LANG, TARGET, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    language: getItem(LANG) || 'en',
    target: getItem(TARGET) || '',
    sidebarOpened: true,
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    /**
     * 设置国际化
     * Set languaga type
     */
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    /**
     * 设置跳转前路由
     * Set last route before jump
     */
    setLastTargetUrl(state, lastTarget) {
      setItem(TARGET, lastTarget)
      state.target = lastTarget
    },
    /**
     * 控制侧边栏
     * Control Sidebar
     */
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 初始化 tagsList
     * Initialize tagsList
     */
    initTagsViewList(state) {
      state.tagsViewList = []
    }
  },
  actions: {}
}
