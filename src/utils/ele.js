//这里封装element的js插件
import Vue from 'vue'
import { checkPassword } from '@/require'

const that= Vue.prototype
const alertPassword= (scope,callBack)=>{ //弹出密码框，并输入密码，进行校验 ,参数1是传过来的参数，参数2是回调函数
    if(typeof scope == 'function'){
        callBack= scope
        scope= undefined
    }
    that.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入密码',
        lockScroll: true,
        customClass: 'passTipClass',
        inputType: 'password'
    }).then(({ value }) => {
        value= value=== null ? '' : value
        checkPassword({password:value}).then((res)=>{
            if(res === 0){
                callBack && callBack(scope) //进行回调
            }else{
                messageTip('warning','密码不正确')
            }
        })
    
    }).catch(() => {
            
    });
}

const alertConfim= (title,callBack)=>{ //确认提示框
    that.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callBack && callBack() //进行回调
      }).catch(() => {
            
      });
}

const confirDelete= (title,callBack)=>{
    that.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callBack && callBack()
      }).catch(() => {
           
    });
}


const messageTip= (type= 'success',message='删除成功')=>{
    that.$message({
        type,
        message
    });
}



export {
    alertPassword,
    confirDelete,
    messageTip,
    alertConfim
}