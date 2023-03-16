import {
  getAnnouncementByType,
  getAnnouncementList,
  getAnnouncementById,
  getAllAnnouncements,
  announcementSave,
  announcementCreate
} from '@/api/announcement'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    draft: true
  }),
  mutations: {
    setDraft(state) {
      state.draft = true
    },
    noDraft(state) {
      state.draft = false
    }
  },
  actions: {
    /**
     * 获取公告简单列表
     * Get a simple list of announcements
     */
    async getAnnouncementList (context, index) {
      const res = await getAnnouncementList(index)
      // console.log(res)
      return res
    },
    /**
     * 获取所有公告信息
     * Get all announcement information
     */
    async getAllAnnouncements (context) {
      const res = await getAllAnnouncements()
      return res
    },
    /**
     * 获取指定id的公告信息
     * Get the announcement information by the id
     */
    async getAnnouncementById (context, id) {
      const res = await getAnnouncementById(id)
      return res
    },
    /**
     * 获取制定类型的公告列表
     * Get the announcement list by the type
     */
    async getAnnouncementByType (context, type) {
      const res = await getAnnouncementByType(type)
      return res
    },
    /**
     * 创建公告
     * Create announcement
     */
    create (context, announcementInfo) {
      const {
        title,
        articleAbstract,
        content,
        coverPicture,
        enable,
        type,
        publishTime
      } = announcementInfo
      return new Promise((resolve, reject) => {
        announcementCreate({
          title,
          articleAbstract,
          content,
          coverPicture,
          enable,
          type,
          publishTime
        })
          .then((data) => {
            router.push('/personal/MyContents/Community')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 保存公告
     * Save announcement
     */
    save (context, announcementInfo) {
      const {
        id,
        title,
        articleAbstract,
        content,
        coverPicture,
        enable,
        type,
        publishTime
      } = announcementInfo
      return new Promise((resolve, reject) => {
        announcementSave({
          id,
          title,
          articleAbstract,
          content,
          coverPicture,
          enable,
          type,
          publishTime
        })
          .then((data) => {
            router.push('/home/announcement/' + id)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
