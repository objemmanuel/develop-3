<template>
  <div class="cropper-modal">
    <el-tooltip
      placement="bottom"
      :content="tooltipTitle"
    >
      <el-upload
        v-model:file-list="imageList"
        name="image"
        list-type="picture"
        action=''
        :http-request='handleUpload'
        :drag="true"
        :show-file-list="false"
        :multiple="false"
        :before-upload="beforeUpload"
        :on-change="handleChange"
        :on-remove="handleDrop"
        style="background: none"
      >
        <div v-if="newImg === null && oldImg === ''">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            {{ $t('msg.cropper.text') }}
          </div>
        </div>
        <div v-else-if="newImg === null">
          <img class="w-100" :src="baseImageUrl + oldImg" alt="Cover">
        </div>
        <div v-else>
          <img class="w-100" :src="newImg" alt="Cover">
        </div>
        <template #tip>
          <div class="el-upload__tip">
            {{ $t('msg.cropper.onlyJPG') }}
          </div>
        </template>
      </el-upload>
    </el-tooltip>
    <el-dialog
      v-model="visible"
      :title="i18n.global.t('msg.cropper.title')"
      :close-on-click-modal="false"
      :confirmLoading="confirmLoading"
      width="60%"
    >
      <div class="cropper-wrapper">
        <vue-cropper
          ref="cropper"
          :img="img"
          :info="true"
          :original="true"
          :centerBox="options.centerBox"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          :fixed="options.fixed"
          :fixedNumber="options.fixedNumber"
        ></vue-cropper>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">
          {{ i18n.global.t('msg.cropper.cancel_text') }}
        </el-button>
        <el-button type="primary" @click="handleOk">
          {{ i18n.global.t('msg.cropper.ok_text') }}
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'
import { useStore } from 'vuex'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { baseImageUrl } from '@/constant'
import i18n from '@/i18n'

const prop = defineProps({
  imgWidth: {
    type: Number,
    required: false,
    default: 300
  },
  imgHeight: {
    type: Number,
    required: false,
    default: 180
  },
  oldImg: {
    type: String,
    required: false,
    default: ''
  },
  tooltipTitle: {
    type: String,
    required: false,
    // eslint-disable-next-line vue/valid-define-props
    default: i18n.global.t('msg.cropper.tooltipTitle')
  }
})
const store = useStore()
const tmpFileName = ref('')
const confirmLoading = ref(false)
const visible = ref(false)
// vue-cropper相关配置 详细的可以去github上看文档 https://github.com/xyxiao001/vue-cropper
// For detailed configuration of vue-cropper, see the documentation on github (https://github.com/xyxiao001/vue-cropper)
const img = ref(null)
const newImg = ref(null)
const cropper = ref(null)
const options = ref({
  autoCrop: true, // 是否默认生成截图框 Generate screenshot box by default
  autoCropWidth: prop.imgWidth, // 默认生成截图框宽度 Default generated screenshot box width
  autoCropHeight: prop.imgHeight, // 默认生成截图框高度 Default generated screenshot box height
  fixedBox: true, // 固定截图框大小,不允许改变 Fixed screenshot box size, not allowed to change
  centerBox: true, // 截图框是否被限制在图片里面 Whether the screenshot box is restricted in the picture
  fixed: true, // 是否开启截图框宽高固定比例 Whether to enable fixed ratio of width and height of screenshot frame
  fixedNumber: [prop.imgWidth, prop.imgHeight] // 截图框的宽高比例 [ 宽度 , 高度 ] Width to height ratio of screenshot frame [width, height]
})
// 存储图片上传后的文件名，暴露给父组件
// Store the file name of the uploaded image and expose it to the parent component
const imgUrl = ref(prop.oldImg)
defineExpose({
  imgUrl
})
// 监听对话框的OK/Cancel按钮的点击事件
// Listen to the click event of the OK/Cancel button in the dialog box
const handleOk = () => {
  confirmLoading.value = true
  // 获取截图的base64 数据
  // Get the base64 data of the screenshot
  cropper.value.getCropData((data) => {
    newImg.value = data
    const file = dataURLtoFile(data, tmpFileName.value)
    store
      .dispatch('resource/uploadImage', file)
      .then((res) => {
        imgUrl.value = res.image
        confirmLoading.value = false
      })
      .catch((err) => {
        console.log(err)
        confirmLoading.value = false
      })
    handleCancel()
  })
}
const handleCancel = () => {
  visible.value = false
}
const imageList = ref([])
const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === 'image/jpg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpeg'
  if (!isJpgOrPng) {
    ElMessage.error(i18n.global.t('msg.cropper.onlyJPG'))
  }
  return isJpgOrPng
}

const handleChange = (info) => {
  // 这个回调函数的参数是个File对象,所以要用FileReader将对象转换成 data-uri (base64) 对象, 才能给vue-cropper
  // The parameter of this callback function is a File object, so you need to use FileReader to convert the object into a data-uri (base64) object before you can give it to vue-cropper
  const reader = new FileReader()
  // 当文件处理完成的回调函数
  reader.onload = function (e) {
    // e.target.result 该属性表示目标对象的DataURL
    console.log(e)
    visible.value = true
    img.value = e.target.result
  }
  // 记录原始的文件名字,用于DataURL(base64)转成file对象,不转就可以不用
  // Record the original file name, which is used to convert the DataURL (base64) into a file object
  tmpFileName.value = info.name
  // 文件处理 file=>base64
  // File processing file=>base64
  reader.readAsDataURL(info.raw)
}
const handleUpload = () => {}
const handleDrop = (e) => {
  console.log(e)
}
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let len = bstr.length
  const u8arr = new Uint8Array(len)
  while (len--) {
    u8arr[len] = bstr.charCodeAt(len)
  }
  return new File([u8arr], filename, { type: mime })
}
</script>

<style scoped>
.cropper-wrapper {
  width: 100%;
  height: 600px;
}
</style>
