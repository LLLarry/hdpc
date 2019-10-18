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
    $route(newVal,oldVal){
      let title= util.handleListToItemInfoFormUrl(this.menuList,newVal.path)
      this.$store.commit('handleChargeNowMenuLink',title)
    }
  }
}
</script>

<style lang="less">
@import '../static/style/base.css';
#app {
  height: 100%;
}
</style>
