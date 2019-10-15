<template>
    <div class="BreadCrumbCon">
       <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
       </el-breadcrumb> -->
       <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        size="medium" 
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
        </el-tag>
    </div>
</template>

<script>
import {Tag} from 'element-ui'
import Vue from 'vue'
Vue.use(Tag)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
export default {
     data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
}
</script>

<style lang="less" scoped>
    @import '../../../static/style/default.less';
    .BreadCrumbCon {
        padding: 8px 20px;
        background-color: @colorC;
        border-bottom: 1px solid @colorD;
        box-sizing: border-box;
        .el-tag {
            margin-right: 10px;
        }
    }
</style>