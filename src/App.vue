<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import { mapGetters,mapState,mapMutations } from 'vuex'
import util from './utils/util'
export default {
  name: 'App',
  computed: {
    ...mapState(['menuList'])
  },
  created(){
      
      
  },
  watch:{ //监听url的改变，当不改变的时候

  }
}
</script>

<style lang="less">
@import '../static/style/base.css';
@import '../static/style/default.less';
@import '../static/style/common.less';
#app {
  height: 100%;
}
</style>
