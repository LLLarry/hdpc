import Vue from 'vue'
import Router from 'vue-router'
import store from '../store' //引入store调用getters方法
import {constantRouterMapSuperAdmin,constantRouterMapAdmin} from './constantRouterMap' 

const originalPush = Router.prototype.push


Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
let newList= store.getters.transformList //路由降维数组
console.log(newList)
const router= new Router({
  routes: [
    {
      path: '/login',
      component: ()=> import('@/components/Login/Login'),
    }
    //上面这两个是基础的配置，后面的是请求过来的
  ]
})
//router.addRoutes(constantRouterMapSuperAdmin)
let routesList= []
router.beforeEach((to,from,next) => {
  const userInfo= store.state.userInfo 
  let routes= store.state.moduleA.asyRouterMap   //获取vuex中的moduleA中存储的路由，moduleA没进行缓存，所以刷新之后会消失
  if(userInfo){ //vuex中存在用户信息
    if(routes.length === 0){ //当moduleA中的路由不存在 （也可能当刷新消失）
      if(userInfo.classify === 'admin'){  //根据权限过滤路由
        routesList= constantRouterMapAdmin
      }else if(userInfo.classify === 'superAdmin'){
        routesList= constantRouterMapSuperAdmin
      }
      router.addRoutes(routesList)  //将过滤出来的路由添加到router中
      store.commit('storeAsyRouterMap',routesList) //将新添加的路由保存在vuex中 
      next({...to}) //调往目标路径
    }else {
      next()
    }
  }else{ //已经存在新路由了
    if (['/login'].indexOf(to.path) !== -1) { //包含/login  判断目标路径中是否包含/login， 包含就前往这个路径，不包含 就跳转到/login路径中
        next()
    } else {  //不包含/login
        next('/login')
    }
  }

  let data= {} //这个是数组，包含title,link,index,是面包屑使用的
  let title= ''
  newList.forEach((item,i)=>{
    if(to.path.includes(item.link)){
      data.title= item.title
      data.link= item.link
      data.index= item.index
      title= item.title
    }
  })
   console.log(title)
   store.commit('handleChargeBreadList',data)
   store.commit('handleChargeNowMenuLink',title)
})

export default router
