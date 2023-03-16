<template>
  <!-- 支持渲染多级 menu 菜单 Support rendering multi-level menu -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title"  :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染 Loop rendering -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <!-- 渲染 item 项 Render items-->
  <el-menu-item v-else :index="route.meta.url ? '' : route.path">
    <menu-item :title="route.meta.title"  :icon="route.meta.icon" :url='route.meta.url'></menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem'
import { defineProps } from 'vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
