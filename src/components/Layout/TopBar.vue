<template>
    <div class="topBar">
        <el-row class="row_con">
            <el-col :span="12" class="col_con" >
                <div class="grid-content bg-purple title_logo hidden-xs-only">
                    <img src="../../assets/images/logo.png" alt="自助充电平台">
                    <span class="title">后台管理系统</span>
                </div>
                <div class="grid-content bg-purple menuIcon hidden-sm-and-up">
                    <div class="menuIconCon" @click="hideOrShowSlide">
                        <i class="iconfont icon-ego-menu"></i>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="col_con"><div class="grid-content bg-purple-light">
              
                <el-link type="danger" @click="handleLayout">退出登录</el-link>
                <i :class="['iconfont' , isBig ? 'icon-quxiaoquanping_o' : 'icon-quanping']" @click="handleFullScreen(isBig)" ></i>
                <span class="top_name">{{userInfo.userName}}</span>
                <!-- <span>556</span> -->
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapMutations,mapState} from 'vuex'
    import {messageTip} from '@/utils/ele'

    export default {
        data(){
            return {
               isBig: false 
            }
        },
        computed: {
            ...mapState(['isShowSlide','userInfo'])
        },
        methods: {
            ...mapMutations(['handleLayoutStore','handleLayoutRemoveAsyRouterMap','updateSlideStatus']),
            handleLayout(){
                this.handleLayoutStore()
                this.handleLayoutRemoveAsyRouterMap()
                window.location.reload() //让页面重新加载，这个是移除router中动态添加的路由，避免再次添加新的路由
            },
            hideOrShowSlide(){
                this.updateSlideStatus(!this.isShowSlide)
            },
            handleFullScreen(isBig){ //全屏
                if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
                    messageTip("warning","您的浏览器暂时不支持全屏模式"); 
                    return 
                }else{
                    screenfull.toggle();
                    this.isBig= !this.isBig
                }
                
            } 
        }
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
                    .menuIconCon {
                        i {
                            color: #555;
                            font-size: 22px;
                        }
                    }
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
                            color: #c0e5ff;
                        }
                    }
                    &.bg-purple-light {
                        .el-link{
                            float: right;
                            margin-left: 10px;
                            font-size: @fontB; 
                        }
                        i {
                            float: right;
                            font-size: 20px;
                            margin-right: 15px;
                            font-weight: bold;
                            color: #aacff4;
                            vertical-align: middle;
                            &:hover {
                                color: #fff;
                                transition: all .3s;
                            }
                        }
                        .top_name {
                            font-size: 16px;
                            color: #aacff4;
                            float: right;
                            margin-right: 25px;
                            width: 200px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            text-align: right;
                        }
                    }
               }
           }
       }
    }

     @media screen and (max-width: 768px) {
        .topBar {
        height: 55px;
       .row_con {
           height: inherit;
           .col_con {
               height: inherit;
               padding: 0 40px;
               .grid-content {
                    height: inherit;
                    line-height: 55px;
               }
           }
       }
    }
    }
</style>