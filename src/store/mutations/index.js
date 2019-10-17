import {UPDATEUSERINFO} from '../mutation-types'
export default {
    handleChargeNowMenuLink(state,data){ //更新当前是哪个菜单
        state.nowMenuLink= data
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    hadnleMenuList(state,menuList){ //更新菜单列表
        state.menuList= menuList
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    handleLayoutStore(state,dd){ //退出登录
       
        state.breadList= [ //面包列表导航
            {title: '数据汇总',link: '/datastatis/index',query: {name:'li',age: 20}},
            {title: '历史统计',link: '/datastatis/hisstatis',query: {name:'wi',age: 30}}
        ]
        state.nowMenuLink= '数据汇总' //当前菜单名称，是为了做返回的时候，菜单保持对应用的
        state.userInfo= null
        state.asyRouterMap= []  //router中的异步路由
        state.menuList= [] //菜单列表
        sessionStorage.removeItem('state')
    },
    [UPDATEUSERINFO](state,data){ //更新用户信息
        state.userInfo= data
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    handleChargeBreadList(state,data){ //更新面包屑
        let breadList= state.breadList
        const flag= breadList.some((item,i)=>{ //检验要存储的元素是否在这里面，有的话返回true,否则返回false
            return item.title == data.title
        })
        if(!flag){
            if(breadList.length>=7){
                breadList.shift() 
            }
            breadList.push({...data})
            state.breadList= breadList
        }
        sessionStorage.setItem('state',JSON.stringify(state))  
    },
    removeBreadListItem(state,title){ //移除面包屑的一项
        let breadList= state.breadList
        breadList= breadList.filter((item,i)=>{
            return item.title != title
        })
        state.breadList= breadList
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    storeAsyRouterMap(state,asyRouterMap){ //更新异步路由
        state.asyRouterMap= asyRouterMap
        sessionStorage.setItem('state',JSON.stringify(state))
    }
}