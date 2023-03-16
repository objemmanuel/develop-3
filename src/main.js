import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// i18n
import i18n from '@/i18n'
// 路由鉴权 route authentication
import './permission'
// 全局样式 global styles
import './styles/index.scss'
// 导入 vue-cropper
import VueCropper from 'vue-cropper'
import 'vue-cropper/dist/index.css'
// svgIcon
import installIcons from '@/icons'
const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store)
  .use(router)
  .use(VueCropper)
  .use(i18n)
  .mount('#app')
