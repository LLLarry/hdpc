<template>
    <div class="BreadCrumbCon">
       <el-tag
        :key="i"
        v-for="(tag,i) in breadList"
        closable
        size="medium" 
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="handleLink(tag.title,tag.link,tag.query)"
        >
        {{tag.title}}
        </el-tag>
    </div>
</template>

<script>
import {Tag} from 'element-ui'
import Vue from 'vue'
import { mapState } from 'vuex'
Vue.use(Tag)

export default {
     data() {
      return {
        inputVisible: false,
        inputValue: ''
      };
    },
    computed: {
      ...mapState({breadList:"breadList"}) //去除vuex中的数据
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      handleLink(title,link,query){
        this.$store.commit('handleChargeNowMenuLink',title)
        this.$router.push({path:link,query:query })
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
            cursor: pointer;
        }
    }
</style>