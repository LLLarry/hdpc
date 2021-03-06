// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' //cdn模式
import App from './App'
import router from './router'
import store from './store'
import Navigation from 'vue-navigation'
import '@/filters'
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi)
Vue.use(Navigation, {router})
// import ElementUI from 'element-ui'; 这是加载全部
import { Button,Checkbox,Col,Row,Progress,MessageBox,Message,Notification,Card,Table,Input,InputNumber,TableColumn,Form, FormItem,Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog,Tag,Menu,Submenu, MenuItem,MenuItemGroup,TabPane,Tabs, Pagination,Radio,
  RadioGroup,ButtonGroup,
  RadioButton,Cascader,Switch,Loading,Breadcrumb,
  BreadcrumbItem,Popover,Steps,Step,Upload,Divider,Tooltip,Collapse, CollapseItem} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import 'element-ui/lib/theme-chalk/display.css';
import 'default-passive-events'
import '../static/style/icon.less'
// cdn的方式引入Element折叠展开动画

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Button);
Vue.use(Checkbox);
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
Vue.use(InputNumber)
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
Vue.use(ButtonGroup)
Vue.use(RadioButton)
Vue.use(Cascader)
Vue.use(Switch)
Vue.use(Loading)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Popover)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Upload)
Vue.use(Divider)
Vue.use(Tooltip)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// 移除加载动画
const body= document.getElementsByTagName('body')[0]
const index_loading= document.getElementsByClassName('index_loading')[0]
body.removeChild(index_loading)

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


Vue.prototype.$bus= new Vue() /*创建一个新的事件总成*/
Vue.config.productionTip = false
// Vue.config.devtools= process.env.NODE_ENV !== "development" /**开发环境下可以调试 */
Vue.config.devtools= false /**开发环境下可以调试 */
Vue.config.errorHandler= function(err, vm, info){
  console.log(err,vm, info)
}

/*
  自定义左填充 补0指令
  用法：
  v-fmtnum:5="99" -> 00099
  v-fmtnum="99" -> 00000099
*/ 
Vue.directive('fmtnum', {
  bind (el, binding) {
    let { arg = 8, value } = binding
    // arg 是参数 value是值
    if (typeof value === 'number' || (typeof value == 'string' && /^\d+$/.test(value)) ) {
      value = value.toString().padStart(arg, 0)
    } 
    el.innerHTML = value
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
