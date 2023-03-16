<template>
  <div class='article-editor'>
    <el-radio-group v-model="languageType"  size="large">
      <el-radio-button v-for="item in languageTypeList" :key='item' :label="item">{{ i18n.global.t('msg.i18n.'+item) }}</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px" />
    <el-form :model="form" label-width="120px">
      <el-form-item :label="i18n.global.t('msg.article.title')">
        <el-input v-if="languageType==='en'" v-model="form.title.en" />
        <el-input v-else v-model="form.title.zh" />
      </el-form-item>
      <el-form-item :label="i18n.global.t('msg.article.type')">
        <el-select v-model="form.type" :placeholder="i18n.global.t('msg.article.typePlaceholder')">
          <el-option v-for='item in articleTypeList' :key='item' :label="i18n.global.t('msg.article.'+translateArticleType(item))" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item :label="i18n.global.t('msg.article.abstract')">
        <el-input v-if="languageType==='en'" v-model="form.articleAbstract.en" type="textarea" />
        <el-input v-else v-model="form.articleAbstract.zh" type="textarea" />
      </el-form-item>
      <el-form-item :label="i18n.global.t('msg.article.cover')">
        <cropper-modal ref="cropperRef" :img-height="180" :img-width="300" :tooltip-title="i18n.global.t('msg.article.coverToolTip')" :old-img="oldImg"/>
      </el-form-item>
      <el-form-item :label="i18n.global.t('msg.article.content')">
        <!-- TODO 这里需要替换成CKEditor It needs to be replaced with a CKEditor -->
        <!-- <el-input v-if="languageType==='en'" v-model="form.content.en" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"/>
        <el-input v-else v-model="form.content.zh" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"/> -->
        <ckeditor v-if="languageType==='en'" :editor="customEditor" :config="editorConfig" v-model="form.content.en" class="el-textarea__inner"></ckeditor>
        <ckeditor v-else :editor="customEditor" :config="editorConfig" v-model="form.content.zh" class="el-textarea__inner"></ckeditor>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveArticle" type="info" style="margin: 0 40px;">{{i18n.global.t('msg.article.save')}}</el-button>
        <el-button v-if="form.enable" type="warning" @click="revocationArticle" style="margin: 0 40px;">{{i18n.global.t('msg.article.revocation')}}</el-button>
        <el-button v-else type="primary" @click="publishArticle" style="margin: 0 40px;">{{i18n.global.t('msg.article.publish')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import CropperModal from '@/components/CropperModal'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import i18n from '@/i18n'
import { languageTypeList, articleTypeList } from '@/constant'
import { translateArticleType } from '@/utils/i18n'
import CKEditor from '@ckeditor/ckeditor5-vue'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
const ckeditor = CKEditor.component
const customEditor = Editor
const editorConfig = {
  ckfinder: {
    // Change this is to server image upload url
    uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
  }
}
const languageType = ref('en')
const route = useRoute()
const cropperRef = ref(null)
const oldImg = ref('')
const form = ref({
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
  enable: false
})
const getArticleById = async (articleId) => {
  await store
    .dispatch('article/getArticleById', articleId)
    .then((res) => {
      console.log(res)
      oldImg.value = res.coverPicture
      form.value.type = res.type
      form.value.enable = res.enable
      if (res.title.startsWith('{')) {
        form.value.title = JSON.parse(res.title)
      } else {
        form.value.title.en = res.title
      }
      if (res.articleAbstract.startsWith('{')) {
        form.value.articleAbstract = JSON.parse(res.articleAbstract)
      } else {
        form.value.articleAbstract.en = res.articleAbstract
      }
      if (res.content.startsWith('{')) {
        form.value.content = JSON.parse(res.content)
      } else {
        form.value.content.en = res.content
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
const saveArticle = () => {
// TODO 补充保存方法
}
const revocationArticle = () => {
// TODO 补充撤回方法
}
const publishArticle = () => {
// TODO 补充发布方法
}
</script>

<style lang='scss' scoped></style>
