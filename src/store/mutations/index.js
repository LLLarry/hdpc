export default {
    handleChargeNowMenuLink(state,data){ //更新当前是哪个菜单
        state.nowMenuLink= data
    },
    handleChargeBreadList(state,data){ //更新面包屑
        let breadList= state.breadList
        const flag= breadList.some((item,i)=>{ //检验要存储的元素是否在这里面，有的话返回true,否则返回false
            return item.title == data.title
        })
        if(!flag){
            if(breadList.length>=7){
                breadList.shift() 
            }
            breadList.push({...data})
            state.breadList= breadList
        }
        
    }
}