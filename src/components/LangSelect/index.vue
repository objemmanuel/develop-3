<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps, onMounted, computed } from 'vue'
import store from '@/store'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function(value) {
      // 这个值必须匹配下列字符串中的一个
      // This value must match one of the following strings
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

// 切换语言的方法
// Method of switching languages
const i18n = useI18n()
const language = computed(() => store.getters.language)
onMounted(() => {
  i18n.locale.value = language.value
})
const handleSetLanguage = lang => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.i18n.switchLangSuccess'))
}
</script>

<style scoped>

</style>
