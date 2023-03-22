import axios from 'axios'
import { showDialog } from 'vant'

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.response.use((res) => {
  const { data: _data } = res
  const { data, code, msg } = _data
  if (code !== 0) {
    console.log(code, 12)
    showDialog({
      message: msg,
    }).then(() => {
      // 关闭弹窗的逻辑
    })
    return Promise.reject(msg)
  }
  return data
})

export default instance
