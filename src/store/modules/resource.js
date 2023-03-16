import { uploadImage, uploadFile, uploadVideo } from '@/api/resource'

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    async uploadImage (context, file) {
      const form = new FormData()
      form.set('image', file)
      const res = await uploadImage(form)
      return res
    },
    async uploadFile (context, file) {
      const form = new FormData()
      form.set('file', file)
      const res = await uploadFile(form)
      return res
    },
    async uploadVideo (context, file) {
      const form = new FormData()
      form.set('video', file)
      const res = await uploadVideo(form)
      return res
    }
  }
}
