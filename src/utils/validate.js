import { Message, MessageBox } from 'element-ui'

let _common = {}

_common = {
    Error,
    Success,
    Warning
}

export default _common

export function Error(text = '错误',) {
    Message({
      message: text,
      type: 'error',
      duration: 3 * 1000
    })
  }
  
  export function Success(text = '成功') {
    Message({
      message: text,
      type: 'success',
      duration: 3 * 1000
    })
  }
  
  export function Warning(text = '警告') {
    Message({
      message: text,
      type: 'warning',
      duration: 3 * 1000
    })
  }