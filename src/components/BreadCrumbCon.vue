<template>
    <div class="BreadCrumbCon">
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
       </el-breadcrumb>
    </div>
</template>

<script>
import {Breadcrumb, BreadcrumbItem} from 'element-ui'
import Vue from 'vue'
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
export default {
    
}
</script>

<style lang="less" scoped>
    .BreadCrumbCon {
        padding: 10px 20px;
        background-color: #f1f3f5;
        border-bottom: 1px solid #fff;
        box-sizing: border-box;
    }
</style>