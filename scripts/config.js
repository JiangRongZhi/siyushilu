// config.js

// 后台请求地址 开发模式下改地址已变看第15行
//let baseUrl = 'http://shiyu.aijink.com/jp-admin'
//let baseUrl = 'http://hntky.aijink.com/jp-admin'
let baseUrl = 'http://106.13.119.77:8888/jp-admin'

// rsa 公窑
const rsaSecret =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6f66pBZ7wS7+eLOGDpILzyRetEib53ycQ/roudbhCB4nALvzscm6MyjAZoVf4A/V0PU4LjjIaLQVkQ/sO9oxTUKqjCxCdq1go8TALGoKZKkPDhno1On/h7mS0eXTlstHGt1NmDRPhT8Ah+Q5xmCRnTHWfSqHAlW2BkeMfW+GrPQIDAQAB'

const fileuploadUrl = 'https://jsonplaceholder.typicode.com/posts/'

// 开发模式
if (process.env.NODE_ENV === 'development') {
  console.log('dev mode')
  //baseUrl = 'http://192.168.0.165:8081/ajk-admin'
  baseUrl = 'http://106.13.119.77:8888/jp-admin'
}

export default {
  fileuploadUrl,
  baseUrl,
  rsaSecret
}
