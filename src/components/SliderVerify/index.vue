<template>
  <div class="slide-verify" :style="{width: canvasWidth + 'px'}" onselectstart="return false;">
    <!-- 图片加载遮蔽罩 image loading mask-->
    <div :class="{'img-loading': isLoading}" :style="{height: canvasHeight + 'px'}" v-if="isLoading"/>
    <!-- 认证成功后的文字提示 Text prompt after successful authentication -->
    <div class="success-hint" :style="{height: canvasHeight + 'px'}" v-if="verifySuccess">{{ successHint }}</div>
    <!-- 刷新按钮 Refresh button -->
    <div class="refresh-icon" @click="refresh"/>
    <!-- 前端生成 Front-end generation -->
    <template v-if="isFrontCheck">
      <!-- 验证图片 Verify Picture -->
      <canvas ref="canvas" class="slide-canvas" :width="canvasWidth" :height="canvasHeight"/>
      <!-- 阻塞块 block -->
      <canvas ref="block" class="slide-block" :width="canvasWidth" :height="canvasHeight"/>
    </template>
    <!-- 后端生成 Back-end generation -->
    <template v-else>
      <!-- 验证图片 Verify Picture -->
      <img ref="canvas" class="slide-canvas" :width="canvasWidth" :height="canvasHeight"/>
      <!-- 阻塞块 block -->
      <img ref="block" :class="['slide-block', {'verify-fail': verifyFail}]"/>
    </template>
    <!-- 滑动条 slider -->
    <div class="slider" :class="{'verify-active': verifyActive, 'verify-success': verifySuccess, 'verify-fail': verifyFail}">
      <!-- 滑块 slider box-->
      <div class="slider-box" :style="{width: sliderBoxWidth}">
        <!-- 按钮 button -->
        <div class="slider-button" :id="sliderId" :style="{left: sliderButtonLeft}">
          <!-- 按钮图标 Button icon -->
          <div class="slider-button-icon"/>
        </div>
      </div>
      <!-- 滑动条提示文字 Slider prompt text -->
      <span class="slider-hint">{{ sliderHint }}</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/sys'
import i18n from '@/i18n'
// TODO 规范接口调用
function sum(x, y) {
  return x + y
}

function square(x) {
  return x * x
}
export default {
  name: 'sliderVerify',
  props: {
    // 阻塞块长度 block length
    blockLength: {
      type: Number,
      default: 42
    },
    // 阻塞块弧度 block radius
    blockRadius: {
      type: Number,
      default: 10
    },
    // 画布宽度 canvas width
    canvasWidth: {
      type: Number,
      default: 320
    },
    // 画布高度 canvas height
    canvasHeight: {
      type: Number,
      default: 155
    },
    // 滑块操作提示  Slider operation tips
    sliderHint: {
      type: String,
      default: i18n.global.t('msg.sliderVerify.sliderHint')
    },
    // 可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5，若为 -1 则不进行机器判断
    // The allowable error range is small; If it is 1, it means that the slider must completely overlap with the groove before the verification can be successful. The default value is 5. If it is - 1, the machine will not be judged
    accuracy: {
      type: Number,
      default: 3
    },
    // 图片资源数组 Picture resource array
    imageList: {
      type: Array,
      default: () => []
    },
    // true为前端校验，false为后端校验 True means front-end verification, and false means back-end verification
    isFrontCheck: {
      type: Boolean,
      default: false
    },
    // 滑块id slider Id
    sliderId: {
      type: String,
      default: 'slider-button'
    }
  },
  data() {
    return {
      // 校验进行状态 Verification progress status
      verifyActive: false,
      // 校验成功状态 Verification success status
      verifySuccess: false,
      // 校验失败状态 Verification failure status
      verifyFail: false,
      // 阻塞块对象 Block object
      blockObj: null,
      // 图片画布对象 Canvas Object
      canvasCtx: null,
      // 阻塞块画布对象 Block canvas object
      blockCtx: null,
      // 阻塞块宽度 Block width
      blockWidth: this.blockLength * 2,
      // 阻塞块的横轴坐标 Horizontal coordinate of blocking block
      blockX: undefined,
      // 阻塞块的纵轴坐标 Vertical coordinate of blocking block
      blockY: undefined,
      // 图片对象 image object
      image: undefined,
      // 移动的X轴坐标 X axis coordinate of movement
      originX: undefined,
      // 移动的Y轴做坐标 Y axis coordinate of movement
      originY: undefined,
      // 拖动距离数组 Drag distance array
      dragDistanceList: [],
      // 滑块箱拖动宽度 Slider box drag width
      sliderBoxWidth: 0,
      // 滑块按钮距离左侧起点位置 Position of slider button from left starting point
      sliderButtonLeft: 0,
      // 鼠标按下状态 Mouse down state
      isMouseDown: false,
      // 图片加载提示，防止图片没加载完就开始验证 Prompt for picture loading to prevent verification before the picture is loaded
      isLoading: true,
      // 时间戳，计算滑动时长 Timestamp, used to calculate the sliding time
      timestamp: null,
      // 成功提示 Success prompt
      successHint: '',
      // 随机字符串 Random string
      nonceStr: undefined
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /* 初始化 Initialize */
    init() {
      this.initDom()
      this.bindEvents()
    },
    /* 初始化DOM对象 Initialize DOM object */
    initDom() {
      this.blockObj = this.$refs.block
      if (this.isFrontCheck) {
        this.canvasCtx = this.$refs.canvas.getContext('2d')
        this.blockCtx = this.blockObj.getContext('2d')
        this.initImage()
      } else {
        this.getCaptcha()
      }
    },
    /* 后台获取验证码 Get verification code in the background */
    getCaptcha() {
      const self = this
      // 取后端默认值
      // Get backend default value
      getCodeImg().then((res) => {
        const data = res
        self.nonceStr = data.nonceStr
        self.$refs.block.src = data.blockSrc
        self.$refs.block.style.top = data.blockY + 'px'
        self.$refs.canvas.src = data.canvasSrc
      }).finally(() => {
        self.isLoading = false
      })
    },
    /* 前端获取验证码 Front end obtains verification code */
    initImage() {
      const image = this.createImage(() => {
        this.drawBlock()
        const { canvasWidth, canvasHeight, blockX, blockY, blockRadius, blockWidth } = this
        this.canvasCtx.drawImage(image, 0, 0, canvasWidth, canvasHeight)
        this.blockCtx.drawImage(image, 0, 0, canvasWidth, canvasHeight)
        // 将抠图防止最左边位置
        // Prevent matting from the leftmost position
        const yAxle = blockY - blockRadius * 2
        const ImageData = this.blockCtx.getImageData(blockX, yAxle, blockWidth, blockWidth)
        this.blockObj.width = blockWidth
        this.blockCtx.putImageData(ImageData, 0, yAxle)
        // 图片加载完关闭遮蔽罩
        // Close the mask after the picture is loaded
        this.isLoading = false
        // 前端校验设置特殊值
        // Special value for front-end verification setting
        this.nonceStr = 'loyer'
      })
      this.image = image
    },
    /* 创建image对象 Create image object */
    createImage(onload) {
      const image = document.createElement('img')
      image.crossOrigin = 'Anonymous'
      image.onload = onload
      image.onerror = () => {
      }
      image.src = this.getImageSrc()
      return image
    },
    /* 获取imgSrc Get imgSrc */
    getImageSrc() {
      const len = this.imageList.length
      return len > 0 ? this.imageList[this.getNonceByRange(0, len)] : `/resource/images/captcha/${this.getNonceByRange(1, 10)}.jpg`
    },
    /* 根据指定范围获取随机数 Get random number according to the specified range */
    getNonceByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start)
    },
    /* 绘制阻塞块 Draw blocking block */
    drawBlock() {
      this.blockX = this.getNonceByRange(this.blockWidth + 10, this.canvasWidth - (this.blockWidth + 10))
      this.blockY = this.getNonceByRange(10 + this.blockRadius * 2, this.canvasHeight - (this.blockWidth + 10))
      this.draw(this.canvasCtx, 'fill')
      this.draw(this.blockCtx, 'clip')
    },
    /* 绘制事件 Draw Events */
    draw(ctx, operation) {
      const PI = Math.PI
      const { blockX: x, blockY: y, blockLength: l, blockRadius: r } = this
      // 绘制
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
      ctx.lineTo(x + l, y)
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
      ctx.lineTo(x + l, y + l)
      ctx.lineTo(x, y + l)
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
      ctx.lineTo(x, y)
      // 修饰
      ctx.lineWidth = 2
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.stroke()
      ctx[operation]()
      ctx.globalCompositeOperation = 'destination-over'
    },
    /* 事件绑定 Event binding */
    bindEvents() {
      // 监听鼠标按下事件
      // Listen for mouse down events
      document.getElementById(this.sliderId).addEventListener('mousedown', (event) => {
        this.startEvent(event.clientX, event.clientY)
      })
      // 监听鼠标移动事件
      // Listen for mouse movement events
      document.addEventListener('mousemove', (event) => {
        this.moveEvent(event.clientX, event.clientY)
      })
      // 监听鼠标离开事件
      // Listen for mouse leave events
      document.addEventListener('mouseup', (event) => {
        this.endEvent(event.clientX)
      })
      // 监听触摸开始事件
      // Listen for touch start event
      document.getElementById(this.sliderId).addEventListener('touchstart', (event) => {
        this.startEvent(event.changedTouches[0].pageX, event.changedTouches[0].pageY)
      })
      // 监听触摸滑动事件
      // Listen for touch sliding events
      document.addEventListener('touchmove', (event) => {
        this.moveEvent(event.changedTouches[0].pageX, event.changedTouches[0].pageY)
      })
      // 监听触摸离开事件
      // Listen for touch leave events
      document.addEventListener('touchend', (event) => {
        this.endEvent(event.changedTouches[0].pageX)
      })
    },
    /* 校验图片是否存在 Check whether the picture exists */
    checkImgSrc() {
      if (this.isFrontCheck) {
        return true
      }
      return !!this.$refs.canvas.src
    },
    /* 滑动开始事件 Slide start event */
    startEvent(originX, originY) {
      if (!this.checkImgSrc() || this.isLoading || this.verifySuccess) {
        return
      }
      this.originX = originX
      this.originY = originY
      this.isMouseDown = true
      this.timestamp = +new Date()
    },
    /* 滑动事件 Sliding event */
    moveEvent(originX, originY) {
      if (!this.isMouseDown) {
        return false
      }
      const moveX = originX - this.originX
      const moveY = originY - this.originY
      if (moveX < 0 || moveX + 40 >= this.canvasWidth) {
        return false
      }
      this.sliderButtonLeft = moveX + 'px'
      const blockLeft = (this.canvasWidth - 40 - 20) / (this.canvasWidth - 40) * moveX
      this.blockObj.style.left = blockLeft + 'px'
      this.verifyActive = true
      this.sliderBoxWidth = moveX + 'px'
      this.dragDistanceList.push(moveY)
    },
    /* 滑动结束事件 Slide end event */
    endEvent(originX) {
      if (!this.isMouseDown) {
        return false
      }
      this.isMouseDown = false
      if (originX === this.originX) {
        return false
      }
      // 开始校验
      // Start verification
      this.isLoading = true
      // 校验结束
      // End of calibration
      this.verifyActive = false
      // 滑动时长
      // Sliding duration
      this.timestamp = +new Date() - this.timestamp
      // 移动距离
      // Moving distance
      const moveLength = parseInt(this.blockObj.style.left)
      // 限制操作时长10S，超出判断失败
      // The operation duration is limited to 10s, and the judgment fails when exceeding the limit
      if (this.timestamp > 10000) {
        this.verifyFailEvent()
      } else
      // 人为操作判定
      // Human operation judgment
      if (!this.turingTest()) {
        this.verifyFail = true
        this.$emit('again')
      } else
      // 是否前端校验
      // Front end verification
      if (this.isFrontCheck) {
        const accuracy = this.accuracy <= 1 ? 1 : this.accuracy > 10 ? 10 : this.accuracy // 容错精度值 Tolerance accuracy value
        const spliced = Math.abs(moveLength - this.blockX) <= accuracy // 判断是否重合 Judge whether it is coincident
        if (!spliced) {
          this.verifyFailEvent()
        } else {
          // 设置特殊值，后台特殊处理，直接验证通过
          // Set special values, perform special processing in the background, and pass direct verification
          this.$emit('success', { nonceStr: this.nonceStr, value: moveLength })
        }
      } else {
        this.$emit('success', { nonceStr: this.nonceStr, value: moveLength })
      }
      // this.isLoading = false;
    },
    /* 图灵测试 Turing test */
    turingTest() {
      const arr = this.dragDistanceList // 拖动距离数组 Drag distance array
      const average = arr.reduce(sum) / arr.length // 平均值 average
      const deviations = arr.map((x) => x - average) // 偏离值 deviations
      const stdDev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // 标准偏差 standard deviation
      return average !== stdDev // 判断是否人为操作 Judge whether it is manually operated
    },
    /* 校验成功 Verification succeeded */
    verifySuccessEvent() {
      this.isLoading = false
      this.verifySuccess = true
      const elapsedTime = (this.timestamp / 1000).toFixed(1)
      if (elapsedTime < 1) {
        this.successHint = i18n.global.t('msg.sliderVerify.successHint1')
      } else if (elapsedTime < 2) {
        this.successHint = i18n.global.t('msg.sliderVerify.successHint2')
      } else {
        this.successHint = i18n.global.t('msg.sliderVerify.successHint3')
      }
    },
    /* 校验失败 Verification failed */
    verifyFailEvent(msg) {
      this.verifyFail = true
      this.$emit('fail', msg)
      this.refresh()
    },
    /* 刷新图片验证码 Refresh picture verification code */
    refresh() {
      this.isLoading = true
      // 延迟class的删除，等待动画结束
      // Delay the deletion of class and wait for the end of animation
      setTimeout(() => {
        this.verifyFail = false
      }, 500)
      this.verifyActive = false
      this.verifySuccess = false
      this.blockObj.style.left = 0
      this.sliderBoxWidth = 0
      this.sliderButtonLeft = 0
      if (this.isFrontCheck) {
        // 刷新画布
        // Refresh the canvas
        const { canvasWidth, canvasHeight } = this
        this.canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight)
        this.blockCtx.clearRect(0, 0, canvasWidth, canvasHeight)
        this.blockObj.width = canvasWidth
        // 刷新图片
        // Refresh Picture
        this.image.src = this.getImageSrc()
      } else {
        this.getCaptcha()
      }
    }
  }
}
</script>

<style scoped>
.slide-verify {
  position: relative;
  margin:0 auto;
}

/*图片加载样式*/
/*Picture loading style*/
.img-loading {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  animation: loading 1.5s infinite;
  background-image: url('../../../public/assets/img/icons/loading.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100px;
  background-color: #737c8e;
  border-radius: 5px;
}

@keyframes loading {
  0% {
    opacity: .7;
  }
  100% {
    opacity: 9;
  }
}

/*认证成功后的文字提示*/
/*Text prompt after successful authentication*/
.success-hint {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  color: #2CD000;
  font-size: large;
}

/*刷新按钮*/
/*Refresh button*/
.refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background: url('/public/assets/img/icons/refresh.svg');
  background-size: 35px 35px;
}

/*验证图片*/
/*Verify Picture*/
.slide-canvas {
  border-radius: 5px;
}

/*阻塞块*/
/*Blocking block*/
.slide-block {
  position: absolute;
  left: 0;
  top: 0;
}

/*校验失败时的阻塞块样式*/
/*Blocking block style when verification fails*/
.slide-block.verify-fail {
  transition: left 0.5s linear;
}

/*滑动条*/
/*Slide bar*/
.slider {
  position: relative;
  text-align: center;
  width: 90%;
  margin: 20px auto 0;
  height: 40px;
  line-height: 40px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
  border-radius: 5px;
  touch-action: pan-y;
}

/*滑动盒子*/
/*Slide box*/
.slider-box {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  /* border: 0 solid #1991FA; */
  background: #D1E9FE;
  border-radius: 5px;
}

/*滑动按钮*/
/*Slide button*/
.slider-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 38px;
  background: #fff;
  /* box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); */
  cursor: pointer;
  transition: background .2s linear;
  border-radius: 5px;
}

/*鼠标悬浮时的按钮样式*/
/*Button style when hovering*/
.slider-button:hover {
  background: #fff0fe45;
}

/*鼠标悬浮时的按钮图标样式*/
/*Button icon style when hovering*/
.slider-button:hover .slider-button-icon {
  background-position: 0 -13px
}

/*滑动按钮图标*/
/*Slide button icon*/
.slider-button-icon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 15px;
  height: 13px;
  background: url('../../../public/assets/img/icons/slider.svg');
  background-size: 15px 13px
}

/*校验时的按钮样式*/
/*Button style during verification*/
.verify-active .slider-button {
  height: 38px;
  top: -1px;
  border: 1px solid #1991FA;
}

/*校验时的滑动箱样式*/
/*Sliding box style during calibration*/
.verify-active .slider-box {
  height: 38px;
  border-width: 1px;
}

/*校验成功时的滑动箱样式*/
/*Sliding box style in case of successful verification*/
.verify-success .slider-box {
  height: 38px;
  border: 1px solid #52CCBA;
  background-color: #D2F4EF;
}

/*校验成功时的按钮样式*/
/*Sliding button style in case of successful verification*/
.verify-success .slider-button {
  height: 38px;
  top: -1px;
  border: 1px solid #52CCBA;
  background-color: #52CCBA !important;
}

/*校验成功时的按钮图标样式*/
/*Button icon style when verification is successful*/
.verify-success .slider-button-icon {
  background-position: 0 0 !important;
}

/*校验失败时的滑动箱样式*/
/*Sliding box style when verification fails*/
.verify-fail .slider-box {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
  transition: width 0.5s linear;
}

/*校验失败时的按钮样式*/
/*Button style when verification fails*/
.verify-fail .slider-button {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
  transition: left 0.5s linear;
}

/*校验失败时的按钮图标样式*/
/*Button icon style when verification fails*/
.verify-fail .slider-button-icon {
  top: 14px;
  background-position: 0 -82px !important;
}

/*校验状态下的提示文字隐藏*/
/*Hidden prompt text in verification status*/
.verify-active .slider-hint,
.verify-success .slider-hint,
.verify-fail .slider-hint {
  display: none;
}
</style>
