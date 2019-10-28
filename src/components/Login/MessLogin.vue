<template>
    <div class="messLogin">
         <el-form  status-icon ref="ruleForm"  :rules="rules"  class="demo-ruleForm">
            <el-form-item prop="phone" >
                <el-input 
                v-model="ruleForm.phone"
                placeholder="请输入手机号"
                clearable
               >
                <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
               </el-input>
            </el-form-item>
            <el-form-item prop="message">
                <el-input 
                placeholder="请输入验证码" 
                v-model="ruleForm.message"
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
// import { Form,FormItem,Input} from 'element-ui'
import {asyHandleLoginAct} from '../../require'
import Vue from 'vue'
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
export default {
     data() {
         var checkPhone = (rule, value, callback) => {
             console.log(rule, value,)
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                    } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            }
        return {
            ruleForm: {
                 phone: '',
                 message: '',
            },
            rules: {
                phone: [
                    { validator: checkPhone, trigger: 'blur'}
                ]
            }
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