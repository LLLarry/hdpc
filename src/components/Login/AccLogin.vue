<template>
    <div class="accLogin">
       <el-form  status-icon ref="ruleForm" :model="accLoginForm"  class="demo-ruleForm" :rules="rules">
            <el-form-item prop="phone" >
                <el-input 
                v-model="accLoginForm.phone"
                placeholder="请输入手机号"
                clearable
               >
                <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
               </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                 type="password" 
                 v-model="accLoginForm.password"
                 autocomplete="off"
                 placeholder="请输入密码"
                 clearable
                >
                 <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-form-item>
            <el-form-item style="margin-top:-18px;margin-bottom:0px;" >
              <el-checkbox v-model="checked" style="color:#a0a0a0;margin-top:-10px;">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
            <div :class="['loginInfo',loginInfo.status === 200 ? 'success': 'error']">
               {{loginInfo.message}}
            </div>
        </el-form>
    </div>
</template>

<script>
import {asyHandleLoginAct} from '../../require'
import Vue from 'vue'
import { mapActions } from 'vuex'
import myCookie from '@/utils/myCookie'
const coo= new myCookie()
export default {
    data() {
        // 校验手机号码
        const checkPhone = (rule, value, callback) => {
		    const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
		    if (!value) {
		      return callback(new Error('电话号码不能为空'))
		    }
		    setTimeout(() => {
		      if (!Number.isInteger(+value)) {
		        callback(new Error('请输入数字值'))
		      } else {
		        if (phoneReg.test(value)) {
		          callback()
		        } else {
		          callback(new Error('电话号码格式不正确'))
		        }
		      }
		    }, 100)
		  };
        return {
            checked:true,
            accLoginForm: {
                phone: '',
                password: ''
            },
            rules: {
                phone: [
                    {required: true, validator: checkPhone, trigger: 'blur'}
                ]
            },
            loginInfo: { //登录信息
                status: 0, //登录状态 200 201 202 ...
                message: ''
            }
        }
    },
    created(){
        //创建的时候获取存储的账号密码 
        const cookieObj= coo.getCookie()
        let {phone="",password=""}= cookieObj
        this.accLoginForm= {phone, password} 
    },
    methods: {
    ...mapActions(['asyHandleLoginAct']),
      submitForm() {

        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            
            if(this.checked){
              coo.setCookie(this.accLoginForm.phone,this.accLoginForm.password, 7);
            }else{
              coo.clearCookie();
            }
            const data= {
              phone:this.accLoginForm.phone,
              password:this.accLoginForm.password,
            }
            const loginInfo= this.asyHandleLoginAct(data)
            loginInfo.then((res)=>{
                this.loginInfo= {
                     status: res.userInfo.code,
                     message: res.userInfo.message
                }

            },(err)=>{

            })
          } else {
            return false;
          }
        });
         
      }
    }
}
</script>

<style lang="less" scoped>
    .accLogin{
        .el-form{
            margin-top: 5px;
            .el-form-item__content {
                .el-button {
                    width: 100%;
                    border-radius: 40px;
                }
            }
        }
        .loginInfo {
                    font-size: 14px;
                    text-align: center;
                    &.error {
                        color: #F56C6C;
                    }
                    &.success {
                        color: #67C23A;
                    }
                } 
    }
    
</style>