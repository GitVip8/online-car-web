
import axios from 'axios'

export function fetch (options, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => { // then 请求成功之后进行什么操作
        resolve(response) // 把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error)
        reject(error)
      })
  })
}
