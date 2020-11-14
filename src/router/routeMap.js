import routeList from './routeList'
//创建map对象，用来存放 path和异步组件之间的关系
const map= new Map() 

export default routeList[1].children.forEach((item,index)=>{
    map.set(item.path,item.component)
})