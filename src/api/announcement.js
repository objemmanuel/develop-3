import request from '@/utils/request'

export const getAnnouncementList = (index) => {
  return request({
    url: '/announcements/list/' + index,
    method: 'get'
  })
}

export const getAllAnnouncements = () => {
  return request({
    url: '/announcements',
    method: 'get'
  })
}

export const getAnnouncementById = (id) => {
  return request({
    url: '/announcements/' + id,
    method: 'get'
  })
}

export const getAnnouncementByType = (type) => {
  return request({
    url: '/announcements/type-' + type,
    method: 'get'
  })
}

export const announcementCreate = (data) => {
  return request({
    url: '/announcements',
    method: 'post',
    data
  })
}

export const announcementSave = (data) => {
  return request({
    url: '/announcements',
    method: 'put',
    data
  })
}
