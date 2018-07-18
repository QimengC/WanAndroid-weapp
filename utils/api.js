const API_DOMAIN = 'http://www.wanandroid.com/'
import fetch from './fetch'
/*
 * @param  {String} api 接口地址
 * @param  {Objece} params 接口参数参数
 */
function fetchApi(api, params) {
  return fetch(API_DOMAIN, api, params)
}

// banner
function banner(params) {
  return fetchApi(`banner/json`, params).then(res => res)
}

function article(params,page) {
  return fetchApi(`article/list/${page}/json`,params).then(res => res)
}

function listAll(params) {
  return fetchApi(`tree/json`, params).then(res => res)
}

function listChapter(params,page) {
  return fetchApi(`article/list/${page}/json`,params).then(res => res)
}

function listProject(params,page) {
  return fetchApi(`project/list/${page}/json`).then(res => res)
}


module.exports = {
  banner,
  article,
  listAll,
  listChapter,
  listProject,
}


