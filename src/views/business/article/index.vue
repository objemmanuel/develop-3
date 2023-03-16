<template>
  <div class='article-list'>
    <el-table
      :data="tableData"
      height="800"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" fixed="left"/>
<!--      <el-table-column prop="id" sortable :label="i18n.global.t('msg.article.id')"/>-->
      <el-table-column prop="title" :label="i18n.global.t('msg.article.title')"  fixed="left" min-width="200" show-overflow-tooltip>
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span v-if="store.getters.language === 'zh' ">{{ scope.row.title.zh }}</span>
            <span v-else >{{ scope.row.title.en }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="coverPicture" :label="i18n.global.t('msg.article.cover')" width="80" align='center'>
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image
              :src="baseImageUrl + scope.row.coverPicture"
              :preview-src-list="[baseImageUrl + scope.row.coverPicture]"
              preview-teleported
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        :label="i18n.global.t('msg.article.type')"
        align='center'
        sortable
        :filters='filterTypes'
        :filter-method='filterTypeHandle'
      >
        <template #default="scope">
          <span>{{ i18n.global.t('msg.article.'+translateArticleType(scope.row.type)) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" :label="i18n.global.t('msg.article.createBy')" align='center'/>
      <el-table-column prop="createTime" sortable :label="i18n.global.t('msg.article.createTime')" align='center' width="160"/>
      <el-table-column prop="readCount" sortable :label="i18n.global.t('msg.article.readCount')" align='center' width="120"/>
      <el-table-column
        prop="enable"
        :label="i18n.global.t('msg.article.enable')"
        align='center'
        width="120"
        sortable
        :filters='filterStatus'
        :filter-method='filterStatusHandle'
      >
        <template #default="scope">
          <el-tag :type="scope.row.enable ? 'success' : 'danger'">
            {{ scope.row.enable ? i18n.global.t('msg.article.published') : i18n.global.t('msg.article.unpublished')}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="action" :label="i18n.global.t('msg.article.action')" align='center' width="200" fixed="right">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button size="small" type="primary" @click="handleShow(scope.row.id)">{{ i18n.global.t('msg.article.show') }}</el-button>
            <el-button size="small" type="success" @click="handleEdit(scope.row.id)">{{ i18n.global.t('msg.article.edit') }}</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">{{ i18n.global.t('msg.article.delete') }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import store from '@/store'
import router from '@/router'
import i18n from '@/i18n'
import { articleTypeList, baseImageUrl } from '@/constant'
import { translateArticleType } from '@/utils/i18n'
const language = computed(() => store.getters.language)
const tableData = ref([])
const getArticlesByUser = async () => {
  store
    .dispatch('article/getArticleList')
    .then((res) => {
      tableData.value = res
      tableData.value.map((article) => (article.title = JSON.parse(article.title)))
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
getArticlesByUser()
const handleShow = (id) => {
  router.push('/business/article/detail/' + id)
}

const handleEdit = (id) => {
  router.push('/business/article/editor/' + id)
}
const handleDelete = (id) => {
  // TODO 补充删除方法
  console.log(id)
}
const filterTypes = ref([])
watch(language, () => {
  filterTypes.value = articleTypeList.map((x) => { return { text: i18n.global.t('msg.article.' + translateArticleType(x)), value: x } })
}, { immediate: true })
const filterTypeHandle = (value, row) => {
  return row.type === value
}
const filterStatus = ref([])
watch(language, () => {
  filterStatus.value = [
    {
      text: i18n.global.t('msg.article.published'),
      value: true
    },
    {
      text: i18n.global.t('msg.article.unpublished'),
      value: false
    }
  ]
}, { immediate: true })
const filterStatusHandle = (value, row) => {
  return row.enable === value
}
</script>

<style scoped>

</style>
