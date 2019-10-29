// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'; 这是加载全部
// import { Button, Select,Col,Row,Progress,MessageBox,Message,Notification,} from 'element-ui';
import { Button,Col,Row,Progress,MessageBox,Message,Notification,Card,Table,Input,TableColumn,Form, FormItem,Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog,Tag,Menu,Submenu, MenuItem,MenuItemGroup,TabPane,Tabs, Pagination,Radio,
  RadioGroup,
  RadioButton,} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import 'element-ui/lib/theme-chalk/display.css';
import 'default-passive-events'
import '../static/style/icon.less'

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Button);
Vue.use(Select);
Vue.use(Col);
Vue.use(Row);
Vue.use(Progress);

Vue.use(Tag)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Link)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

const wxScriptLength= document.getElementsByClassName('wxLoginClass').length
      if(wxScriptLength<=0){
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.setAttribute('class','wxLoginClass ')
        script.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
        document.body.appendChild(script)
      }
      
  handleSlide()   
window.onresize = function() {
  handleSlide()
}

function handleSlide(){
  const isShowSlide= store.state.isShowSlide
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if(width> 768 && isShowSlide== false){
    store.commit('updateSlideStatus',true)
  }
  if(width<= 768 && isShowSlide== true){
    store.commit('updateSlideStatus',false)
  }
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
