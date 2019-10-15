import Vue from 'vue'
import Router from 'vue-router'
import store from '../store' //引入store调用getters方法
// import HelloWorld from '@/components/HelloWorld'
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
    },
    {
      path: '*',
      redirect: '/login'
    },
    //上面这两个是基础的配置，后面的是请求过来的
    {
      path: '/',
      component: ()=> import('@/components/Layout/layout'),
      children: [
        {
          path: '/datastatis/index',
          component: ()=> import('@/views/DataStatis/DataStatis')
        },
        {
          path: '/datastatis/hisstatis',
          component: ()=> import('@/views/DataStatis/Hisstatis')
        },
        {
          path: '*',
          component: ()=> import('@/components/NoFind/NoFind'),
        },
      ]
    },
    
  ]
})
router.afterEach((to, from) => {
    console.log(to, from)
    let data= {} //这个是数组，包含title,link,index,是面包屑使用的
    newList.forEach((item,i)=>{
      if(item.link == to.path){
        data.title= item.title
        data.link= item.link
        data.index= item.index
      }
    })
   store.commit('handleChargeBreadList',data)
})

export default router
