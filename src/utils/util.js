import moment from 'moment'
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
    formatTimeArr(type="YYYY-MM-DD HH:mm:ss"){ //格式化时间字符串,转化为最近7天的数组
      return [moment(new Date-7*24*60*60*1000).format(type),moment(new Date).format(type)]  //[ "2019-11-05 11:30:15","2019-11-12 11:30:15"]
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
    }

}