import Vue from 'vue'
import moment from 'moment'
/**
 * 全局时间过滤器
 */
Vue.filter('fmtDate',(date,type="YYYY-MM-DD HH:mm:ss")=>{
    if(!date){
        return ''
    }
    return moment(date).format(type)
})

Vue.prototype.$fmtDate= function(date,type="YYYY-MM-DD HH:mm:ss"){ //将日期格式化，并进行换行
    if(!date){
        return ''
    }
    return moment(date).format(type).replace(/\s+/,'</br>')
}