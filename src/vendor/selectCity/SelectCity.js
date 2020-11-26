import data from'./list'

function SelectCity(options){
	options= options || {}
    this.list= data || [] //数据list
}
/*通过id查找城市list对应关系*/
SelectCity.prototype.findChildCityById= function(id){
	id= id.toString()
	var pid1= id.substr(0,2)
	var pid2= id.substr(0,4)
	var pid3= id
    var lv1,lv2,lv3

	lv1= this.list.find(function(item,index){
		return new RegExp("^"+pid1+"\\d?").test(item[0])
	})

	if(lv1 && lv1[2].length > 0){
		lv2= lv1[2].find(function(item,index){
			return new RegExp("^"+pid2+"\\d?").test(item[0])
		})
		if(lv2 && lv2[2].length > 0){
			lv3= lv2[2].find(function(item,index){
				return new RegExp("^"+pid3+"\\d?").test(item[0])
			})
		}
	}
	return {
		lv1: lv1,
		lv2: lv2,
		lv3: lv3
	}
}

// 通过展示等级和父id来查询   level本次选择的等级：1、2、3， id:父id ， callback:选中之后的回调 
SelectCity.prototype.selectMenu= function(options){
	var list= [] //存放选择器的容器
	if(options.level == 1){
		list= this.fmtData(this.list)
	}else{
		var data= this.findChildCityById(options.pid)
		try{
			list= this.fmtData(data['lv'+(options.level-1)][2])
		}catch(e){
			list= []
		}
	}
    var index= list.findIndex(function(item){return item.value == options.id})
    return {list, index }
}
// 格式化数据
SelectCity.prototype.fmtData= function(list){
	var listContent= []
	if(list instanceof Array){
		for(var i= 0; i<list.length;i++){
			listContent.push({
				value: list[i][0],
				text: list[i][1]
			})
		}
	}
	return listContent
}
export default SelectCity