<template>
    <div class="breadCrumbNav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item 
                v-for="(item,i) in breadcrumbList" 
                :key="i" 
                :to="item.path"
            >  
                 <strong v-if="item.bread">{{ item.bread }}</strong>
                {{item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {}
    },
    computed: {
        ...mapState({breadcrumbList:"breadcrumbList"}),
    }
}
</script>

<style lang="less">
.breadCrumbNav {
    padding: 10px;
}
</style>