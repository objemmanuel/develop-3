const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  /**
   * 判断是否存在用户信息
   * Check whether there is user information
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  /**
   * 判断是否存在登录前的访问地址
   * Check whether there is an access address before login
   */
  hasTarget: (state) => {
    return JSON.stringify(state.app.target) !== ''
  },
  target: (state) => state.app.target,
  isAdmin: (state) => state.user.userInfo.user.isAdmin,
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}
export default getters
