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
    formatTime (fmt, date) { //格式化时间字符串
        date = new Date(date + '+08:00') // 兼容safari
        var o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
}