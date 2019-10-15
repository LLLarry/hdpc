import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
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
