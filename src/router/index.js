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
    // {
    //   path: '*',
    //   redirect: '/login'
    // },
    {
      path: '/login',
      component: ()=> import('@/components/Login/Login'),
    },
    {
      path: '/',
      component: ()=> import('@/components/Layout/layout'),
      children: [
        {
          path: '/datastatis',
          component: ()=> import('@/pages/DataStatis/DataStatis')
        },
        {
          path: '/datastatis/hisstatis',
          component: ()=> import('@/pages/DataStatis/Hisstatis')
        },
        {
          path: '*',
          component: ()=> import('@/components/NoFind/NoFind'),
        },
      ]
    },
    
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
