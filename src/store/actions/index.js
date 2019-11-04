import {handleLogin} from '../../require'
import {UPDATEUSERINFO} from '../mutation-types'
import router from '../../router';
export default {
    // 登录校验
    async asyHandleLoginAct({ commit, state },data){
        let loginInfo=  await handleLogin(data)
        if(loginInfo.userInfo.code == 200){
            commit(UPDATEUSERINFO,loginInfo.userInfo) //存储的时候讲主store中的路由列表存下来了asyRouterMap,副路由moduleA也存下来了，
            router.push({path: '/datastatis/index'})
        }
        return loginInfo
      
    }
 
}