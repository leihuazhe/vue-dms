import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'X-Custom-Header': 'foobar',
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 添加一个请求拦截器 后面加全局loading
axios.interceptors.request.use(function (config) {
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 添加一个响应拦截器 后面加全局loading
axios.interceptors.response.use(function (response) {
  console.log("response=>",response)
  return response
}, error => {
  dealError(error.response ? error.response.status : '')
  return Promise.reject(error)
})

// 处理错误
const dealError = (errorStatus) => {
  if (!errorStatus) return
  let toastMsg
  switch (errorStatus) {
    case 400:
      toastMsg = '参数错误'
      break
    case 401:
      toastMsg = '未登录，请登录！'
      break
    case 403:
      toastMsg = '没有操作权限！'
      break
    case 404:
      toastMsg = '404啦...快去检查链接!'
      break
    case 405:
      toastMsg = '方法不允许请求!请检查方法的RequestMethod前后端配置是否一致'
      break
    case 408:
      toastMsg = '请求超时...！'
      break
    case 413:
      toastMsg = '请求数据超大,请查看是否上传了大附件'
      break
    case 500:
      toastMsg = '服务出错'
      break
    case 502:
      toastMsg = '网络连接失败,请检查网络连接'
      break
    case 504:
      toastMsg = '网络连接失败,请检查网络连接'
      break
    case 631:
      break
    case 632:
      break
    default:
      toastMsg = '网络连接失败,请检查网络连接'
  }
  console.log(toastMsg)
}

export const post = (obj) => {
  const url = '/' + obj.service
  return service({
    url,
    method: obj.type || 'post',
    data: obj.type === 'post' || !obj.type ? obj.data : '',
    params: obj.type === 'get' ? obj.data : ''
  })
}

export const getQueryCondition = (obj) => {
  obj = obj || {}
  const page = {
    start: obj.start || 0,
    limit: obj.limit || 5,
    results: obj.results || 0
  }
  page.pageIndex = obj.pageIndex || Math.floor(page.start / page.limit) + 1
  const start = (page.pageIndex - 1) * page.limit
  page.start = start
  return page
}

export const getCurrentPage = (pageResponse) => {
  const currentPage = {
    start: pageResponse.start || 0,
    limit: pageResponse.limit || 5,
    results: pageResponse.results || 0
  }
  const pageIndex = Number(currentPage.start / currentPage.limit) + 1
  currentPage.pageIndex = pageIndex
  return currentPage
}

/**
 * 统一封装请求
 */
export const fetchApi  = ()=> {
  let func = (obj) => {
    // 兼容无参请求写法
    let { url, request, success, error, ...args } = obj || {}
    util.dealNullQueryCondition(request)
    crud
      .post({
        service: url,
        dealException: true,
        data: request
      })
      .then(res => {
        const data = res.data
        if (data.status === 1) {
          success(data)
        } else {
          util.message({
            message: data.responseMsg,
            type: 'error'
          })
        }
      })
      .catch(error => {
        console.error('request admin/listMetadata error:', error)
        util.message({
          message: error,
          type: 'error'
        })
      })
  }
  return func
}
