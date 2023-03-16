import {
  getArticleList,
  getAllArticles,
  getArticleById,
  getArticlesByType,
  articleCreate,
  articleSave
} from '@/api/article'
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
     * 获取文章简单列表
     * Get a simple list of articles
     */
    async getArticleList(context) {
      const res = await getArticleList()
      // console.log(res)
      return res
    },
    /**
     * 获取所有文章信息
     * Get all article information
     */
    async getAllArticles(context) {
      const res = await getAllArticles()
      return res
    },
    /**
     * 获取指定id的文章信息
     * Get the article information by the id
     */
    async getArticleById(context, id) {
      const res = await getArticleById(id)
      return res
    },
    /**
     * 获取制定类型的文章列表
     * Get the list of articles by the type
     */
    async getArticlesByType(context, type) {
      const res = await getArticlesByType(type)
      return res
    },
    /**
     * 创建文章
     * Create article
     */
    create(context, articleInfo) {
      const {
        title,
        articleAbstract,
        content,
        coverPicture,
        enable,
        type
      } = articleInfo
      return new Promise((resolve, reject) => {
        articleCreate({
          title,
          articleAbstract,
          content,
          coverPicture,
          enable,
          type
        })
          .then((data) => {
            router.push('/profile?tab=article')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 保存文章
     * Save article
     */
    save(context, articleInfo) {
      const {
        id,
        title,
        articleAbstract,
        content,
        coverPicture,
        enable,
        type
      } = articleInfo
      return new Promise((resolve, reject) => {
        articleSave({
          id,
          title,
          articleAbstract,
          content,
          coverPicture,
          enable,
          type
        })
          .then((data) => {
            router.push('/library/article/' + id)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
