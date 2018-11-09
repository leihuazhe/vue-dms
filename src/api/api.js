import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
})

// 添加一个请求拦截器 后面加全局loading
axios.interceptors.request.use(function (config) {
  return config;
}, error => {
  console.log(error)
  return Promise.reject(error);
});

// 添加一个响应拦截器 后面加全局loading
axios.interceptors.response.use(function (response) {
  return response;
}, error => {
  dealError(error.response ? error.response.status : '')
  return Promise.reject(error);
});

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

