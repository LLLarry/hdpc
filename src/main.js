// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'; 这是加载全部
import { Button, Select,Col,Row } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Button);
Vue.use(Select);
Vue.use(Col);
Vue.use(Row);

const wxScriptLength= document.getElementsByClassName('wxLoginClass').length
      if(wxScriptLength<=0){
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.setAttribute('class','wxLoginClass ')
        script.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
        document.body.appendChild(script)
      }
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
