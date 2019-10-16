import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'
import moduleA from './module/module'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        moduleA,
      },
    state,
    mutations,
    actions,
    getters
})