<template>
  <div class="qrCodeRedict">
     <div class="logining">
       <div class="cont">
         正在登录{{dot}}
       </div>
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
    created(){
      setInterval(()=>{
        let length= this.dot.length
        this.dot= length== 1 ? '..' : length== 2 ? '...' : '.'
      },300)
      let {code="",state=""}= this.$route.query
      let loginInfo= this.asyHandleCaptcha({code,state})
      if(loginInfo.code != 200){ //登录失败
        messageTip('error',loginInfo.message)
        setTimeout(()=>{
          this.$router.push('/login')
        },3000)
      }
    },
    methods: {
        ...mapActions(['asyHandleCaptcha']),
    }
}
</script>

<style lang="less">
.qrCodeRedict {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#71AF9C, #B8D0A4);
  .logining {
    margin: 20% auto;
    text-align: center;
    font-size: 30px;
    font-family: cursive;
    color: #fff;
    .cont {
      display: inline-block;
      width: 200px;
      text-align: left;
    }
  }
}

</style>