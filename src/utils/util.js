export default {

    handleListToItemInfoFormUrl(list,url){  //name是點擊的名字 '歷史收益'
        let title
        list.forEach((item,i)=>{
            if(item.children && item.children.length>0){
            item.children.forEach((jtem,j)=>{
                    if(jtem.link == url){
                        title= jtem.title
                    }
            })
            }
        })
        return title
    }
}