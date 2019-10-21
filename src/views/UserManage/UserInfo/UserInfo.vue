<template>
    <div class="userInfo">
        <el-progress :percentage="percentageNum"></el-progress>
        用户信息
        <el-button type="primary" @click="handleClick">默认按钮</el-button>
    </div>
</template>

<script>
import {Progress} from 'element-ui'
import Vue from 'vue'
Vue.use(Progress)
export default {
    data(){
        return {
            percentageNum: 0
        }
    },
    methods: {
        handleClick(){
            //  let percentageNum= this.percentageNum
        //    setInterval(()=>{
        //        percentageNum++
        //         this.percentageNum= percentageNum
        //    },50)
        this.percentageNum= 90
        }
    }
}
</script>

<style lang="less" scoped>

</style>