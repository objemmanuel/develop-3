<template>
  <!-- 一级 menu 菜单  Primary menu -->
  <el-menu
    :collapse="!store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activeMenu"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem'

const store = useStore()
// 计算路由表结构
// Calculate routing table structure
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 计算高亮 menu 的方法
// How to calculate the highlighted menu
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss" scoped></style>
