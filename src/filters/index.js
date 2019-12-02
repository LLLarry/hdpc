import Vue from 'vue'
import { isNumber } from 'util'
// import moment from 'moment'
/**
 * 全局时间过滤器
 */
Vue.filter('fmtDate',(date,type="YYYY-MM-DD HH:mm:ss")=>{
    if(!date){
        return ''
    }
    return moment(date).format(type)
})
/**
 * 两个数相减 
 */
Vue.filter('accSub',(arg1,arg2)=>{ 
    if(isNumber(arg1) && isNumber(arg2)){
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);  
    }
    return 'NaN'
})


// Vue.filter('parseBank',(num,type="YYYY-MM-DD HH:mm:ss")=>{
//     if(typeof num == 'string' && num.length > 0){
//         return `  `+num.match(/\d{4}/g).join(' ')
//     }
//     return '— —'
// })

Vue.prototype.$fmtDate= function(date,type="YYYY-MM-DD HH:mm:ss"){ //将日期格式化，并进行换行
    if(!date){
        return ''
    }
    return moment(date).format(type).replace(/\s+/,'</br>')
}