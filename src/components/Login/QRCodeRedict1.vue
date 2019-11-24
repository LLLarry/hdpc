<template>
  <div class="qrCodeRedict">
     <div class="logining">
       正在登录
       <i class="el-icon-loading"></i>
     </div>
  </div>
</template>

<script>
import { messageTip } from '@/utils/ele'
import { mapActions } from 'vuex'
export default {
    data(){
      return {
        dot: '.'
      }
    },
   
}
</script>

<style lang="less">
.qrCodeRedict {
  overflow: hidden;
   position: absolute;
    left:0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.95);
    z-index: 99;
  .logining {
    z-index: 99;
    color: #1989fa;
    text-align: center;
    margin-top: 40%;
  }
}

</style>