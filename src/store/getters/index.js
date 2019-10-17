export default {
    //处理传过来的list,是数组扁平化，遍历出每一项
    transformList(state){
        let newList=[]
        state.menuList.forEach((item,i)=>{
            if(item.children && item.children.length>0){
                newList.push(item.children)
            }
        })
        newList= Array.prototype.concat.apply([],newList)
        return newList
    }
}