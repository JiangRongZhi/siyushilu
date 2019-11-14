let rasCoder
if (process.client) {
  const JSEncrypt = require('jsencrypt').JSEncrypt
  const config = require('@/scripts/config.js').default

  // 实例化一个JSEncrypt对象
  const jse = new JSEncrypt()
  jse.setPublicKey(config.rsaSecret)
  rasCoder = text => {
    return jse.encrypt(text)
  }
} else {
  rasCoder = () => {}
}
export const RASCoder = rasCoder
