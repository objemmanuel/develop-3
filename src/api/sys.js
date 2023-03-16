import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

/**
 * 获取验证码图片
 * Get the verification code image
 */
export const getCodeImg = () => {
  return request({
    url: '/auth/code',
    method: 'get'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/auth/info',
    method: 'get'
  })
}
