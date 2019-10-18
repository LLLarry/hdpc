<template>
    <div class="pagination_con">
         <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="nowPage"  
            layout="prev, pager, next, jumper"
            :total="totalPage"
            prev-text="上一页"
            next-text="下一页"
            >
        </el-pagination>
    </div>
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
           this.$emit('getPage',page)
        }
    }
}
</script>

<style lang="less" scoped>
    .pagination_con {
        text-align: right;
        padding-right: 10%;
        margin-top: 20px;
        .el-pagination {
            display: inline-block;
        }
    }
</style>