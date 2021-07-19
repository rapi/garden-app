import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store={
    state: {
        ip: "",
    },
    getters:{
        ip:({ip})=>ip
    },
    mutations: {
        updateIp (state,ip) {
            state.ip=ip
        }
    }
};
export default new Vuex.Store({
    ...store,
    plugins:[ createPersistedState({
        paths: ['ip']
    })]
})

