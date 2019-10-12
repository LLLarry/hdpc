<template>
    <div class="layout">
         <TopBar /> <!-- 头部组件 -->
         <el-row class="layout_row">
            <el-col :span="3"  class="layout_col_slide">
                <Slide /><!-- 侧边栏组件 -->
            </el-col>
            <el-col :span="21" class="layout_col_main">
              <Main></Main><!-- 内容区域组件 -->
            </el-col>
         </el-row>
         
        
         
    </div>
</template>

<script>
import Slide from './Slide'
import TopBar from './TopBar'
import Main from './Main'
export default {
    data(){
        return {

        }
    },
    components: {
        Slide,
        TopBar,
        Main
    }
}
</script>

<style lang="less" scoped>
    .layout{
        height: inherit;
       .layout_row {
            display: flex;
            height: calc(100% - 80px);
            .layout_col_slide {
                min-width: 180px;
                height: 100%;
            }
            .layout_col_main {
                flex: 1;
                height: 100%;
            }
        }
    }
</style>