<template>
    <div class="main">
        <!-- <BreadCrumbCon /> -->
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
        <div class="bottomBar">
            自助充电平台（www.he360.com.cn）
        </div>
    </div>
</template>

<script>
import BreadCrumbCon from './BreadCrumbCon'
    export default {
        data(){
            return {

            }
        },
        components:{
            BreadCrumbCon
        }

    }
</script>

<style lang="less" scoped>
@import '../../../static/style/default.less';
.main {
    //background-color: @colorB;
    height: calc(100%);
    width: 100%;
    overflow: auto;
     &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
        }

    &::-webkit-scrollbar {
    width: 6px;
    }

    &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
    }
    .bottomBar {
        color: #d7d7d7;
        text-align: center;
        height: 100px;
        line-height: 100px;
    }
}
</style>