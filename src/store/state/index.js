let obj= {
    breadList: [ //面包列表导航
        {title: '数据汇总',link: '/datastatis/index',query: {name:'li',age: 20}},
        {title: '历史统计',link: '/datastatis/hisstatis',query: {name:'wi',age: 30}}
    ],
    nowMenuLink: '数据汇总', //当前菜单名称，是为了做返回的时候，菜单保持对应用的
    userInfo: null,
    asyRouterMap: [], //router中的异步路由
    menuList: [] //菜单列表
}
let state= JSON.parse(sessionStorage.getItem('state') || JSON.stringify(obj))
export default state