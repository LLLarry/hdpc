<template>
    <div class="login">
            <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple">
                         <div class="title">
                            <img src="../../assets/images/logo.png" alt="自助充电平台">
                            <span>自助充电平台</span>
                        </div> 
                    </div>
                </el-col>
           </el-row>     
        <el-row class="form_row">
                <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="14">
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="10">
                    <div class="grid-content bg-purple">
                         <div class="login_form">
                                <h1>登录后台管理系统</h1>
                            <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                                    <el-tab-pane label="扫码登录" name="first">
                                        <div class="login_item">
                                            <!-- <h4>请使用微信扫码登录</h4> -->
                                            <div class="qrCodeCon" id="login_ewm"></div>
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
                </el-col>
           </el-row> 
    </div>
</template>

<script>
import Vue from 'vue'
import AccLogin from './AccLogin' //账号登录
import MessLogin from './MessLogin' //短信登录

export default {
    data() {
      return {
        activeName: 'second',
        wxLogin: null
      };
    },
    mounted () {
        // 调用微信接口二维码
        if(WxLogin){
            this.handleWxLogin()
        }
    },
    components:{
        MessLogin,
        AccLogin,
    },
    methods: {
      handleClick(tab, event) {
        const ele= event.target || event.srcElement
        if(ele.id== 'tab-first'){
           if( !this.wxLogin){
              this.handleWxLogin()
           }
        }
      },
      handleWxLogin(){
          let wxLogin=new WxLogin({
                id:"login_ewm", 
                appid: "wx695275de73b7dad4", 
                scope: "snsapi_login", 
                redirect_uri:"http://www.tengfuchong.com.cn",
                state: "2",
                style: "black",
                href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDI0MHB4OyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAwIGF1dG87fQ0KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5pbmZvIHt3aWR0aDogMjAwcHg7fQ0KLnN0YXR1c19pY29uIHtkaXNwbGF5OiBub25lfQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30g"
            });
            const iframe= document.getElementsByTagName('iframe')[0]
            iframe.width="280px;"
            iframe.height="300px;"
            this.wxLogin= wxLogin
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
            width: 422px;
            margin: 0 auto;
            box-sizing: border-box;
            // position: absolute;
            // top: 260px;
            // right: 200px;
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
                margin: 0 auto;
               
            }
        }
    }
    .form_row {
       margin-top: 6%;
        .el-col {
            min-height: 10px;
        }
    }
</style>