const moduleA = {
    state: { 
        asyRouterMap: [], //router中的异步路由
    },
    mutations: {
        storeAsyRouterMap(state,asyRouterMap){ //更新异步路由
            state.asyRouterMap= asyRouterMap
        }
    },
    actions: {
        
    },
    getters: {
      
    }
  }
  export default moduleA