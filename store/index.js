// @/store/index.js

// const cookieparser = process.server ? require('cookieparser') : undefined
// export const actions = {
//   async nuxtServerInit(context, payload) {
//     // console.log(payload.req.headers)
//     if (payload.req.headers.cookie) {
//       const parsed = cookieparser.parse(payload.req.headers.cookie)
//       console.log(parsed)
//       if (parsed.token) {
//         // context.commit('setToken', parsed)
//         await context.dispatch('user/getUserInfoOnServer', parsed)
//       }
//       await 0
//     }
//   }
// }
