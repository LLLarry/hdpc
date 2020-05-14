<template>
    <div class="topInfo">
        <el-card>
            <div class="clearfix item_c">
                <div class="item">
                    小区名称：
                    <el-button type="primary" size="mini" icon="el-icon-edit">测试小区</el-button>
                </div>
                <div class="item">
                    所属商户：
                    <router-link to="">
                        <el-link type="primary">测试商户</el-link>
                    </router-link>
                </div>
                <div class="item">
                    商户电话：
                    <router-link to="">
                        <el-link type="primary">1553623236</el-link>
                    </router-link>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.topInfo {
    .item_c {
        margin-right: -20px;
        .item {
            font-size: 14px !important;
            float: left;
            margin-right: 20px;
        }
    }
   
}
</style>