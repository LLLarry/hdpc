<template>
    <div class="login">
        <div class="title">
            <img src="../../assets/images/logo.png" alt="自助充电平台">
            <span>自助充电平台</span>
        </div> 
        <div class="login_form">
            <h1>登录后台管理系统</h1>
           <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                <el-tab-pane label="扫码登录" name="first">
                    <div class="login_item">
                         <h4>请使用微信扫码登录</h4>
                         <div class="qrCodeCon">

                         </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="账号登录" name="second">
                    <div class="login_item">
                        <AccLogin />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="短信登录" name="third">
                    <div class="login_item">
                        <MessLogin /> 
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {TabPane,Tabs} from 'element-ui'
import Vue from 'vue'
import AccLogin from './AccLogin' //账号登录
import MessLogin from './MessLogin' //短信登录
Vue.use(Tabs)
Vue.use(TabPane)
export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    components:{
        MessLogin,
        AccLogin,
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="less" scoped>
    @import '../../../static/style/default.less';
    .login {
        width: 100%;
        height: 100%;
        background-image: url('../../assets/images/login.png');
        background-size: 100% 100%;
        overflow: hidden;
        position: relative;
        .title {
            margin: 4% 0 0 4%;
            img {
                width: 100px;
                height: 100px;
                vertical-align: middle;
            }
            span {
                font-size: 36px;
                color: #333;
                font-weight: 600;
                font-family: "Helvetica Neue","Hiragino Sans GB";
            }
        }
        .login_form {
            background-color: #fff;
            border: 1px solid @colorD;
            border-radius: 8px;
            padding: 30px 70px 30px;
            position: absolute;
            top: 260px;
            right: 200px;
            .login_item {
                width: 280px;
            }
            h1 {
                font-size: 18px;
                color: #409eff;
                text-align: center;
                padding-bottom: 20px;
            }
            h4 {
                margin-bottom: 15px;
                text-align: center;
                color: @colorF;
                font-weight: 400;
            }
            .qrCodeCon {
                width: 220px;
                height: 220px;
                background-color: pink;
                margin: 0 auto;
            }
        }
    }
</style>