import { watch } from 'vue'
import store from '@/store'
import i18n from '@/i18n'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}

export function translateArticleType(type) {
  switch (type) {
    case '技术':
      return 'type_technology'
    case '经济':
      return 'type_economics'
    case '论文':
      return 'type_paper'
    case 'web3.0':
      return 'type_web3'
    case '测试':
      return 'type_test'
    default:
      return 'type_test'
  }
}
