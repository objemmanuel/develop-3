import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import log from './modules/log'
import article from './modules/article'
import announcement from './modules/announcement'
import resource from './modules/resource'
import permission from './modules/permission'
export default createStore({
  state: {
  },
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    app,
    log,
    announcement,
    article,
    resource,
    permission
  }
})
