//这里封装element的js插件
import Vue from 'vue'
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
        inputType: 'password'
    }).then(({ value }) => {
        that.$message({
        type: 'success',
        message: '你的密码是: ' + value
    });
    callBack && callBack(scope) //进行回调
    }).catch(() => {
        that.$message({
            type: 'info',
            message: '取消输入'
        });       
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
    messageTip
}