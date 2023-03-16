<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8" style="margin-bottom: 10px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div style="text-align: center">
              <el-avatar :size="100" :src="baseAvatarUrl + store.getters.userInfo.user.avatarName" />
            </div>
            <ul class="user-info">
              <li><div style="height: 100%">用户名<div class="user-right">{{ user.username }}</div></div></li>
              <li>用户昵称<div class="user-right">{{ user.nickName }}</div></li>
              <li>用户类型<div class="user-right">{{ user.dept.name }}</div></li>
              <li>手机号码<div class="user-right">{{ user.phone }}</div></li>
              <li>用户邮箱<div class="user-right">{{ user.email }}</div></li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { baseAvatarUrl } from '@/constant/index'
import { useStore } from 'vuex'
const store = useStore()
const user = ref({})
user.value = store.getters.userInfo.user
</script>

<style lang="scss" scoped>
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li{
    border-bottom: 1px solid #F0F3F4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;
    a{
      color: #317EF3;
    }
  }
}
</style>
