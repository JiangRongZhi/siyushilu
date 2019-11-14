export default function(context) {
  // const userId = context.store.state.user.userInfo.userId
  let token
  if (process.client) {
    const Cookie = require('js-cookie')
    token = Cookie.get('token')
  }
  const name = context.route.name
  const query = context.route.query
  // const fullPath = context.route.fullPath
  // console.log(250, token, name, query)
  if (token === undefined && name !== 'index' && !query.token) {
    // console.log('auth:', Object.keys(context))
    // return context.redirect(`/login?fp=${fullPath}`)
    //return context.redirect('/?login=no')
  }
}
