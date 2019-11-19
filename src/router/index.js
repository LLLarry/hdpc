import Vue from 'vue'
import Router from 'vue-router'
import store from '../store' //引入store调用getters方法
import Util from '@/utils/util'
import {constantRouterMapSuperAdmin,constantRouterMapAdmin} from './constantRouterMap' 

const originalPush = Router.prototype.push


Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: '/dist',
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
  let newList= store.getters.transformList //路由降维数组 （菜单）
  let menuList= store.state.menuList //导航菜单 （菜单）

  let asyRouterMapList= store.getters.transformAsyRouterMap //路由降维数组 （异步路由）

  const userInfo= store.state.userInfo 
  let routes= store.state.moduleA.asyRouterMap   //获取vuex中的moduleA中存储的路由，moduleA没进行缓存，所以刷新之后会消失
  // console.log('routes',routes)
  if(userInfo){ //vuex中存在用户信息
    if(routes.length === 0){ //当moduleA中的路由不存在 （也可能当刷新消失）,刷新会使router中动态提添加的路由消失，所以加上这个
      if(userInfo.classify === 'Admin'){  //根据权限过滤路由
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
// 每次路由跳转的时候，都去取消上一个路由存储的cancelToken,并清空数组
  store.commit('clearToken') // 取消请求
// 这个是获取面包屑导航list
let navList=Util.slicePath(to.path).map((ktem,k)=>{
    asyRouterMapList.forEach((item,i)=>{
      if(ktem === item.path){
        ktem= {
          name: item.name,
          path: item.path
        }
      }else{
        menuList.forEach((ntem,n)=>{
          if(ktem == ntem.link){
            ktem= {
              name: ntem.title,
              // path: ntem.link
            }
          }
        }) 
      }
    })
    return ktem
  })
  store.commit('updataBreadcrumbList',navList)
  // let data= {} //这个是数组，包含title,link,index,是面包屑使用的
  // let title= ''
  // newList.forEach((item,i)=>{
  //   if(to.path.includes(item.link)){
  //     data.title= item.title
  //     data.link= item.link
  //     data.index= item.index
  //     title= item.title
  //     store.commit('handleChargeBreadList',data)
  //   }
  // })
   
  //  store.commit('handleChargeNowMenuLink',title);
})



// next() 表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
// next('login') 表示路由拦截成功，重定向至login，会再次调用router.beforeEach()

export default router
