<template>
    <div class="topBar">
        <el-row class="row_con">
            <el-col :span="12" class="col_con" ><div class="grid-content bg-purple">fff</div></el-col>
            <el-col :span="12" class="col_con"><div class="grid-content bg-purple-light">
                <span>退出登录</span>
                <span>用户名：张三</span>
                <span>556</span>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },

    }
</script>

<style lang="less" scoped>
    @import '../../../static/style/default.less';
    .topBar {
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
                    &.bg-purple-light {
                       span {
                            float: right;
                            margin-left: 10px;
                        }
                    }
               }
           }
       }
    }
</style>