import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'           // vuex持久化解决

Vue.use(Vuex)

const state = {
    tokenName: 'labor-auth-token',               //令牌名
    token: '',                                   //token
    companyName: '',                             //所属项目的公司名
    cs_admin_appId: '',                          //项目id
    cs_admin_secret: ''                          //项目密匙
}

const mutations = {
    changeToken(state, token) {
        state.token = token
    },
    changeCompanyName(state, companyName) {
        state.companyName = companyName
    },
    changeAppId(state, cs_admin_appId) {
        state.cs_admin_appId = cs_admin_appId
    },
    changeSecret(state, cs_admin_secret) {
        state.cs_admin_secret = cs_admin_secret
    }
}

export default new Vuex.Store({
    state,
    mutations,
    plugins: [
        new VuexPersistence({
            reducer: state => ({
                //这个就是存入localStorage的值
                token: state.token,
                companyName: state.companyName,
                cs_admin_appId: state.cs_admin_appId,
                cs_admin_secret: state.cs_admin_secret
            })
        }).plugin
    ]
})