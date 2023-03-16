import request from '@/utils/request'

export const updateAvatar = (data) => {
  return request({
    url: '/users/updateAvatar',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
export const getMessages = (data) => {
  return request({
    url: '/messages' + data,
    method: 'get'

  })
}
export const read = (id) => {
  console.log('apu', id)
  return request({
    url: '/messages/read/' + id,
    method: 'post'
  })
}
export const updateUserPass = (data) => {
  return request({
    url: '/users/updatePass',
    method: 'post',
    data
  })
}

export const getDnu = () => {
  return request({
    url: '/users/dnu',
    method: 'get'
  })
}

export const getDtu = () => {
  return request({
    url: '/users/dtu',
    method: 'get'
  })
}

export const getMnu = () => {
  return request({
    url: '/users/mnu',
    method: 'get'
  })
}

export const getMtu = () => {
  return request({
    url: '/users/mtu',
    method: 'get'
  })
}

export const getUserCount = () => {
  return request({
    url: '/users/user-count',
    method: 'get'
  })
}
