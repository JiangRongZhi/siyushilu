export default function(context) {
  // const userId = context.store.state.user.userInfo.userId
  let token
  if (process.client) {
    const Cookie = require('js-cookie')
    token = Cookie.get('token')
  }
  const name = context.route.name
  const fullPath = context.route.fullPath
  // const query = context.route.query && !query.token, query
  // console.log(250, token, name)
  if (token === undefined && name !== 'mobile-login') {
    // console.log('auth:', Object.keys(context))
    return context.redirect(`/mobile/login?fp=${fullPath}`)
  }
}
