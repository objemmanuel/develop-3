<template>
  <el-config-provider :locale="store.getters.language === 'zh' ? zhCn : en">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import store from '@/store'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const language = computed(() => store.getters.language)

onMounted(() => {
  i18n.locale.value = language.value
})
</script>

<style></style>
