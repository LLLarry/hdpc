<template>
    <div class="messLogin">
         <el-form  status-icon ref="ruleForm"  class="demo-ruleForm">
            <el-form-item prop="phone" >
                <el-input 
                v-model="phone"
                placeholder="请输入手机号"
                clearable
               >
                <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
               </el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input 
                placeholder="请输入验证码" 
                v-model="message"
                clearable
                >
                    <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    <template slot="append">获取验证码</template>
                </el-input>
            </el-form-item>
           
            <el-form-item>
                <el-button type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Form,FormItem,Input} from 'element-ui'
import {asyHandleLoginAct} from '../../require'
import Vue from 'vue'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
export default {
     data() {
        return {
            phone: '',
            message: ''
        }
    },
}
</script>

<style lang="less" >
    .messLogin{
        .el-form{
            margin-top: 5px;
            .el-form-item__content {
                .el-button {
                    width: 100%;
                    border-radius: 40px;
                }
                .el-input-group__append {
                    cursor: pointer;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -o-user-select: none;
                    &:active {
                        background-color: #fefefe;
                    }
                }
            }
        }  
    }
</style>