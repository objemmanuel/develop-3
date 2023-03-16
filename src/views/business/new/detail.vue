<template>
  <div class=''>
    {{ route.params.id ? '社区动态详情' + route.params.id : '社区动态详情'  }}
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang='scss' scoped></style>
