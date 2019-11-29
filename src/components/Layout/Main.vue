<template>
    <div class="main">
        <BreadCrumbNav />
        <!-- <keep-alive>
        <router-view></router-view>
        </keep-alive> -->
        <transition name="list" mode="out-in">
        <router-view></router-view>
        </transition>
        <div class="bottomBar">
            自助充电平台（www.he360.com.cn）
        </div>
    </div>
</template>

<script>
import BreadCrumbNav from './BreadCrumbNav'
    export default {
        data(){
            return {

            }
        },
        components:{
            BreadCrumbNav
        }

    }
</script>

<style lang="less" scoped>
@import '../../../static/style/default.less';
.main {
    background-color: @colorB;
    height: calc(100%);
    overflow: auto;
    // padding: 0 20px 20px 20px;
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
    .list-item {
    display: inline-block;
    margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
    transition: all .3s;
    }
    .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(20px);
    }
}
</style>