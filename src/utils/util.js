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
}