<template>
    <div class="main">
        <BreadCrumbCon />
        <router-view></router-view>
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
    background-color: @colorB;
    height: calc(100%);
}
</style>