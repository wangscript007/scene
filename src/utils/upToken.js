// import VueCookies from 'vue-cookies'

// const upToken = {}

// if (VueCookies.get('labor-auth-token')) {
//   upToken['labor-auth-token'] = VueCookies.get('labor-auth-token')
// }

// export default upToken
import store from '../store'

const upToken = {}

if (store.state.token) {
  upToken[store.state.tokenName] = store.state.token
}

export default upToken