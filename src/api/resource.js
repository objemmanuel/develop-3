import request from '@/utils/request'

export const uploadImage = (data) => {
  return request({
    url: '/resources/image',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export const uploadFile = (data) => {
  return request({
    url: '/resources/file',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export const downloadFile = (fileName) => {
  return request({
    url: '/resources/download/' + fileName,
    method: 'get'
  })
}

export const uploadVideo = (data) => {
  return request({
    url: '/resources/video',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export const videoPreview = (fileName) => {
  return request({
    url: '/resources/video/' + fileName,
    method: 'get'
  })
}
