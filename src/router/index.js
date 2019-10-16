import Vue from 'vue'
import Router from 'vue-router'
import store from '../store' //引入store调用getters方法
import {constantRouterMapSuperAdmin,constantRouterMapAdmin} from './constantRouterMap'
// import HelloWorld from '@/components/HelloWorld'
const originalPush = Router.prototype.push
const classify= store.state.userInfo ? store.state.userInfo.classify : false  //什么权限

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
    },
    {
      path: '*',
      redirect: '/login'
    },
    //上面这两个是基础的配置，后面的是请求过来的
  ]
})
var flag= false
router.afterEach((to, from) => {
    console.log(to, from)
    let data= {} //这个是数组，包含title,link,index,是面包屑使用的
    let title= ''
    newList.forEach((item,i)=>{
      if(to.path.includes(item.link)){
        data.title= item.title
        data.link= item.link
        data.index= item.index
        title= item.title
      }
     if(!flag){
      router.addRoutes(constantRouterMapSuperAdmin)
     }
      
      flag= true
    })
   console.log(title)
   store.commit('handleChargeBreadList',data)
   store.commit('handleChargeNowMenuLink',title)
})

export default router
