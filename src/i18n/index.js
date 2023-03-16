import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

/**
 * 返回当前 lang
 */
function getLanguage () {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  // To use the Composition API mode, you need to set it to false
  legacy: false,
  // 全局注入 $t 函数
  // Global injection $t function
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
