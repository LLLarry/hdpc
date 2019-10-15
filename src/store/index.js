import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import gatters from './gatters'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        breadList: [ //面包列表导航
            {title: '数据汇总',link: '/datastatis/index',query: {name:'li',age: 20}},
            {title: '历史统计',link: '/datastatis/hisstatis',query: {name:'wi',age: 30}}
        ],
        nowMenuLink: '数据监控' //当前菜单名称，是为了做返回的时候，菜单保持对应用的
    },
    mutations,
    actions,
    gatters
})