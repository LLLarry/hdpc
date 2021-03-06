import moment from 'moment'
import { Loading } from 'element-ui'
export default {
    handleListToItemInfoFormUrl(list,url){  //name是點擊的名字 '歷史收益'
        let title
        list.forEach((item,i)=>{
            if(item.children && item.children.length>0){
            item.children.forEach((jtem,j)=>{
                    if(url.includes(jtem.link)){
                        title= jtem.title
                    }
            })
            }
        })
        return title
    },

    getAttr(obj,attr){ //获取元素的css内部的属性值
      if(obj.currentStyle){
        return obj.currentStyle[attr]
      }else{
        return getComputedStyle(obj,false)[attr]
      }
    },

    slicePath(path){ // 分割路径
        //如：/deviceManage/deviceList/deviceDetail =》 ['/deviceManage','/deviceManage/deviceList','/deviceManage/deviceList/deviceDetail']
        let pathArr= []
        if(typeof path != 'string' || path== ''){
            return pathArr
        }
        let pathList= path.slice(1).split('/')
        pathList.forEach((item,i)=>{
            let arr= []
           for(let j=0; j<= i; j++){
             arr.push(pathList[j])
           }
           pathArr.push(arr)
        })
        let retPathList= []
        pathArr.forEach((ktem,k)=>{
            retPathList.push('/'+ktem.join('/'))
        })
       return retPathList
    },

    formatTime(date,type="YYYY-MM-DD HH:mm:ss"){ //格式化时间字符串
        return moment(date).format(type)
    },

    formatTimeArr(type="YYYY-MM-DD HH:mm:ss",day=7){ //格式化时间字符串,转化为最近7天的数组 type输出的的格式 ，day往前推移的天数
      return [moment(new Date-day*24*60*60*1000).format(type),moment(new Date).format(type)]  //[ "2019-11-05 11:30:15","2019-11-12 11:30:15"]
    },

    checkKeyOnlyObj(attr,obj){ //检查某个键是属性的唯一值
      let flag
      for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(key == attr){
              flag= true
            }else{
              flag= false
              return flag
            }
        }
      }
      return flag
    },

    /**
     * 
     * @param {String} text 加载文字
     * @param {String} spinner 加载图标
     * @param {String} customClass 加载class名
     */
    Hd_Loading(argu={}){ //loading加载遮罩层
      let {text='加载中',spinner='el-icon-loading',customClass='loadClass'}= argu
      this.loading= null
      this.show= ()=>{
        this.loading= Loading.service({
          lock: true,
          text,
          spinner,
          customClass
        });
      }
      this.hide= ()=>{
        this.loading && this.loading.close()
      }
    },


    //过滤掉请求参数中的undefined 空字符串""
    fmtParams(params){
      if(params.toString && params.toString() == "[object Object]"){
        let newParams= {}
        for(let key in params){
          if(params[key] !== void 0 && params[key] !== ""){
            newParams[key]= params[key]
          }
        }
        return newParams
      }else {
        return {}
      }
    },

    /**
     *  元素滚动动画
     * @param {*} options 配置参数
     *  el 滚动元素
     *  position 滚动到的位置
     *  time 滚动时间 ms
     */
    scrollTransition ({el = document.body, position = 0, time = 150} = options) {
      const timer = setInterval(() => {
         const move = (el.scrollTop - position) / (time /10)
         if (el.scrollTop - position > 0) {
           el.scrollTop -= move;
         } else {
           clearInterval(timer)
         }
      }, 10)
    }
}

