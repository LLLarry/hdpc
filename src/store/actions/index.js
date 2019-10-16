import {handleLogin} from '../../require'
import {UPDATEUSERINFO} from '../mutation-types'
export default {
    // 登录校验
    async asyHandleLoginAct({ commit, state },data){
        let loginInfo=  await handleLogin({username: 'larry',password:123456})
        console.log(loginInfo)
        if(loginInfo.status == 200 && loginInfo.data.code == 200){
            commit(UPDATEUSERINFO,loginInfo.data)
        }
      
    }
 
}