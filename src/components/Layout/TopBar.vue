<template>
    <div class="topBar">
        <el-row class="row_con">
            <el-col :span="12" class="col_con" >
                <div class="grid-content bg-purple title_logo">
                    <img src="../../assets/images/logo.png" alt="自助充电平台">
                    <span class="title">后台管理系统</span>
                </div>
            </el-col>
            <el-col :span="12" class="col_con"><div class="grid-content bg-purple-light">
               <el-link type="danger">退出登录</el-link>
                <!-- <span>用户名：张三</span>
                <span>556</span> -->
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import {Link} from 'element-ui'
    import Vue from 'vue'
    Vue.use(Link)
    export default {
        data(){
            return {

            }
        },

    }
</script>

<style lang="less" scoped>
    @import '../../../static/style/default.less';
    .topBar {
        background-image: url(../../assets/images/topbg.png);
        width: 100%;
        height: 80px;
        font-size: @fontB;
        color: @colorG;
       .row_con {
           height: inherit;
           .col_con {
               height: inherit;
               padding: 0 40px;
               .grid-content {
                    height: inherit;
                    line-height: 80px;
                    &.title_logo {
                        display: flex;
                        align-items: center;
                        img {
                           width: 60px;
                        }
                        .title {
                            font-size: 25px;
                            margin-left: 10px;
                            font-family: cursive;
                            font-weight: 700;
                        }
                    }
                    &.bg-purple-light {
                        .el-link{
                            float: right;
                            margin-left: 10px;
                            font-size: @fontB; 
                        }
                    }
               }
           }
       }
    }
</style>