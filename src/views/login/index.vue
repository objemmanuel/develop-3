<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        />
        <span class="show-pwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
      >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <el-dialog v-model="isShowSliderVerify" :title="$t('msg.login.sliderTitle')" width='360px'>
        <slider-verify ref="slider" :is-front-check='false' @success="onSuccess" @fail="onFail" @again="onAgain"/>
      </el-dialog>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import i18n from '@/i18n'
import { watchSwitchLang } from '@/utils/i18n'
import SliderVerify from '@/components/SliderVerify/index'
import { ElMessage } from 'element-plus'
import { encrypt } from '@/utils/rsaEncrypt'
const store = useStore()
// 滑动验证码部分 Slide verification code part
const slider = ref()
const isShowSliderVerify = ref(false)
/* 滑动验证成功 Slide verification succeeded */
const onSuccess = async (captcha) => {
  console.log(captcha)
  loginForm.value.uuid = captcha.nonceStr
  loginForm.value.code = captcha.value.toString()
  await login()
  slider.value.refresh()
}
/* 滑动验证失败 Slide verification failed */
const onFail = (msg) => {
  ElMessage.error(msg || i18n.global.t('msg.login.slederErrMsg'))
  slider.value.refresh()
}
/* 滑动验证异常 Slide verification exception */
const onAgain = () => {
  ElMessage.error(i18n.global.t('msg.login.sliderAgainMsg'))
}
const loginForm = ref({
  username: 'admin',
  password: '123456',
  rememberMe: false,
  code: '',
  uuid: ''
})
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: computed(() => {
        return i18n.global.t('msg.login.usernameRule')
      })
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 监听语言变化，重新进行表单校验。 Listen for language changes and perform form verification again.
watchSwitchLang(() => {
  loginFromRef.value.validate()
})
// 处理密码框文本显示状态 Process password box text display status
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
// 登录动作处理 Login action processing
const loading = ref(false)
const loginFromRef = ref(null)
const handleLogin = async () => {
  isShowSliderVerify.value = true
}
const login = async () => {
  const user = {
    username: loginForm.value.username,
    password: loginForm.value.password,
    rememberMe: loginForm.value.rememberMe,
    code: loginForm.value.code,
    uuid: loginForm.value.uuid
  }
  loading.value = true
  user.password = encrypt(user.password + user.code)
  await store
    .dispatch('user/login', user)
    .then(() => {
      loading.value = false
      isShowSliderVerify.value = false
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
      slider.value.refresh()
    })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper{
        background: none;
        box-shadow: none;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
        }
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
