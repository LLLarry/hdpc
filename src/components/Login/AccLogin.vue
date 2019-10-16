<template>
    <div class="accLogin">
       <el-form  status-icon ref="ruleForm"  class="demo-ruleForm">
            <el-form-item prop="phone" >
                <el-input 
                v-model="phone"
                placeholder="请输入手机号"
               >
                <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
               </el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input
                 type="password" 
                 v-model="password"
                 autocomplete="off"
                 placeholder="请输入密码"
                >
                 <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-form-item>
           
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Form,FormItem,Input} from 'element-ui'
import {asyHandleLoginAct} from '../../require'
import Vue from 'vue'
import { mapActions } from 'vuex'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
export default {
    data() {
        return {
            phone: '',
            password: ''
        }
    },
    computed:{
        
    },
    methods: {
    ...mapActions(['asyHandleLoginAct']),
      submitForm() {
          const data= {
              username:this.phone,
              password:this.password,
          }
          this.asyHandleLoginAct(data)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less" scoped>

</style>