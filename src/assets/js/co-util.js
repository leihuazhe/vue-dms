import { Message, MessageBox } from 'element-ui'

// 通过字体图标导入
const fontIcons = {
  success: 'icon-hin_suc1 icon-success',
  error: 'icon-hin_error_-px icon-error',
  warning: 'icon-hin_warn_-px icon-warning',
  info: 'icon-hin_px icon-info',
  confirm: 'icon-hin_px icon-confirm'
}

/**
 * Created by Jarek on 2018/11/08.
 */
export default {
  /**
   * message消息提示
   * @param obj 只支持传输 字符串 和 对象
   * @param obj {message: '', type: 'success'(消息类型)}
   */
  message: (obj) => {
    if (!(obj && (typeof obj === 'string' || Object.prototype.toString.call(obj) ===
        '[object Object]'))) throw Error('请传入正确的参数')
    if (typeof obj === 'string') {
      obj = {
        message: obj
      }
    }
    const message = obj.message || ''
    const icon = obj.type ? fontIcons[obj.type] : fontIcons['info']
    Message({
      showClose: true,
      dangerouslyUseHTMLString: true,
      message: `<i class="iconfont ${icon}"></i><p>${message}</p>`,
      duration: 1500,
      center: true
    })
  },
  /**
   * confirm消息提示
   * @param obj 只支持传输 字符串 和 对象
   */
  confirm: (obj, callback, event, cancel) => {
    if (!(obj && (typeof obj === 'string' || Object.prototype.toString.call(obj) === '[object Object]'))) throw Error('请传入正确的参数')
    if (typeof obj === 'string') {
      obj = {message: obj}
    }
    const message = obj.message || ''
    const icon = obj.type ? fontIcons[obj.type] : fontIcons['confirm']
    const content = `<i class="iconfont ${icon}"></i><p>${message}</p>`
    // todo 需要对不同的 type 提供不同的 icon
    MessageBox.confirm(content, '', {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      type: 'warning',
      center: true,
      beforeClose: (action, instance, done) => {
        done()
        if (action === 'confirm') {
          callback && callback(event)
        } else {
          cancel && cancel()
        }
      }
    }).then(() => {
    }).catch(() => {
    })
  }
}
