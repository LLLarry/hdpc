<template>
     <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="nowPage"  
         layout="prev, pager, next, jumper"
        :total="totalPage">
    </el-pagination>
</template>

<script>
import {Pagination} from 'element-ui'
import Vue from 'vue'
Vue.use(Pagination)
export default {
    data(){
       return {
           nowPage: 0, //当前页数
       }
    },
    props:["totalPage"],
    methods: {
        handleCurrentChange(page){
            console.log(page)
        }
    }
}
</script>

<style lang="less" scoped>

</style>