<template>
  <div class=''>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-image :src="baseImageUrl + article.coverPicture" :preview-src-list="[baseImageUrl + article.coverPicture]"/>
      </el-col>
      <el-col :span="18">
      <el-descriptions :title="language === 'zh' ? article.title.zh : article.title.en" border>
        <template #extra>
          <el-button v-if="article.enable" type="warning" @click="revocationArticle" style="margin: 0 40px;">{{ i18n.global.t('msg.article.revocation') }} </el-button>
          <el-button v-else type="primary" @click="publishArticle" style="margin: 0 40px;">{{ i18n.global.t('msg.article.publish') }}</el-button>
          <el-button type="danger" @click="handleDelete">{{ i18n.global.t('msg.article.delete') }}</el-button>
        </template>
        <el-descriptions-item :label="i18n.global.t('msg.article.type')">
          {{ i18n.global.t('msg.article.' + translateArticleType(article.type)) }}</el-descriptions-item>
        <el-descriptions-item :label="i18n.global.t('msg.article.createBy')">{{ article.createBy }}</el-descriptions-item>
        <el-descriptions-item :label="i18n.global.t('msg.article.createTime')">{{ article.createTime }}</el-descriptions-item>
        <el-descriptions-item :label="i18n.global.t('msg.article.enable')">
          <el-tag :type="article.enable ? 'success' : 'danger'">
            {{ article.enable ? i18n.global.t('msg.article.published') : i18n.global.t('msg.article.unpublished')}}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="i18n.global.t('msg.article.updateBy')">{{ article.updateBy }}</el-descriptions-item>
        <el-descriptions-item :label="i18n.global.t('msg.article.updateTime')">{{ article.updateTime }}</el-descriptions-item>
        <el-descriptions-item :label="i18n.global.t('msg.article.abstract')">
          {{ language === 'zh' ? article.articleAbstract.zh : article.articleAbstract.en }}
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
    </el-row>
    <!-- TODO 这里需要替换成CKEditor的显示模块 It needs to be replaced with a CKEditor to article with a  -->
    <div v-if="language==='en'">
      {{ article.content.en }}
    </div>
    <div v-else >
      {{ article.content.zh }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import i18n from '@/i18n'
import { baseImageUrl } from '@/constant'
import { translateArticleType } from '@/utils/i18n'
const route = useRoute()
const language = computed(() => store.getters.language)
const article = ref({
  id: route.params.id,
  title: {
    en: '',
    zh: ''
  },
  type: '',
  articleAbstract: {
    en: '',
    zh: ''
  },
  content: {
    en: '',
    zh: ''
  },
  coverPicture: '',
  enable: false,
  createBy: '',
  updateBy: '',
  createTime: '',
  updateTime: '',
  readCount: 0
})
const getArticleById = async (articleId) => {
  await store
    .dispatch('article/getArticleById', articleId)
    .then((res) => {
      console.log(res)
      article.value.id = articleId
      article.value.coverPicture = res.coverPicture
      article.value.type = res.type
      article.value.enable = res.enable
      article.value.createBy = res.createBy
      article.value.createTime = res.createTime
      article.value.updateBy = res.updateBy
      article.value.updateTime = res.updateTime
      article.value.readCount = res.readCount

      if (res.title.startsWith('{')) {
        article.value.title = JSON.parse(res.title)
      } else {
        article.value.title.en = res.title
      }
      if (res.articleAbstract.startsWith('{')) {
        article.value.articleAbstract = JSON.parse(res.articleAbstract)
      } else {
        article.value.articleAbstract.en = res.articleAbstract
      }
      if (res.content.startsWith('{')) {
        article.value.content = JSON.parse(res.content)
      } else {
        article.value.content.en = res.content
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
onMounted(() => {
  if (route.params.id) {
    getArticleById(route.params.id)
  }
})
const revocationArticle = () => {
// TODO 补充撤回方法
}
const publishArticle = () => {
// TODO 补充发布方法
}
const handleDelete = () => {
  // TODO 补充删除方法
}
</script>

<style lang='scss' scoped></style>
