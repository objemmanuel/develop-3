import request from '@/utils/request'

export const getArticleList = () => {
  return request({
    url: '/articles/list',
    method: 'get'
  })
}

export const getAllArticles = () => {
  return request({
    url: '/articles',
    method: 'get'
  })
}

export const getArticleById = (id) => {
  return request({
    url: '/articles/' + id,
    method: 'get'
  })
}

export const getArticlesByType = (type) => {
  return request({
    url: '/articles/type-' + type,
    method: 'get'
  })
}

export const articleCreate = (data) => {
  return request({
    url: '/articles',
    method: 'post',
    data
  })
}

export const articleSave = (data) => {
  return request({
    url: '/articles',
    method: 'put',
    data
  })
}
