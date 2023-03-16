import request from '@/utils/request'

export const getDau = () => {
  return request({
    url: '/logs/dau',
    method: 'get'
  })
}

export const getMau = () => {
  return request({
    url: '/logs/mau',
    method: 'get'
  })
}
