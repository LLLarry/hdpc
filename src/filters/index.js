import Vue from 'vue'
import moment from 'moment'
/**
 * 全局时间过滤器
 */
Vue.filter('fmtDate',(date,type="YYYY-MM-DD HH:mm:ss")=>{
    return moment(date).format(type)
})