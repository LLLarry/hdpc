<template>
  <dv-decoration-7 style="width:150px;height:50px;">
      <div class="number-box">
          <div class="num">
              5623.36
            </div>
          <div class="title">历史收益</div>
      </div>
  </dv-decoration-7>
</template>

<script>
export default {
    data(){
        return {
        }
    }
}
</script>

<style lang="less" scoped>
    @font-face {
        font-family: MyFontName;
        src: url(../../../../static/fonts/DS-DIGI.TTF);
    }
    .number-box {
        padding: 0 10px;
        color: rgba(255,255,255,.86);
        text-align: center;
        .num {
            font-size: 30px;
            font-weight: 600;
            font-family: MyFontName;
            background-image: -webkit-gradient(linear, left center, right center, from(rgb(190, 222, 231)), to(rgb(0, 180, 255)));
            -webkit-background-clip: text; /*蹇呴渶鍔犲墠缂� -webkit- 鎵嶆敮鎸佽繖涓猼ext鍊� */
            -webkit-text-fill-color: transparent; /*text-fill-color浼氳鐩朿olor鎵�瀹氫箟鐨勫瓧浣撻鑹诧細 */
        }
    }
    
</style>