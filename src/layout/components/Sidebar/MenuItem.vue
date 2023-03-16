<template>
  <svg-icon :icon="icon"></svg-icon>
  <a :href='url' target='_blank'><span>{{ generateTitle(title) }}</span></a>
</template>

<script setup>
import { generateTitle } from '@/utils/i18n'
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  }
})
</script>

<style lang="scss" scoped>
</style>
