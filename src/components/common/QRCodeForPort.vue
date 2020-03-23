<template>
  <div class="qrcodefroport">
      <div class="title">{{selectPortCode}}号设备的端口二维码</div>
    <div class="qr_content">
      <div class="demo-image clearfix">
        <div class="block" v-for="fit in 20" :key="fit">
          <qrcode :value="`http://www.he360.com.cn/${selectPortCode}`" :size="200" />
          <span class="demonstration">{{selectPortCode}}-{{ fit }}</span>
        </div>
      </div>
    </div>
    <div class="port_code">
        <el-button type="primary" size="mini" @click="this.handleDown">批量导出端口二维码</el-button>
    </div>
  </div>
</template>

<script>
import qrcode from "vue-qrcode2";
export default {
  props: ["selectPortCode"],
  methods: {
    async handleDown() {
      let JSZip = await import("@/vendor/jszip.min");
      let FileSaver = await import("@/vendor/FileSaver.min");
      this.downloadPicture(JSZip, FileSaver);
    },
    downloadPicture(JSZip, FileSaver) {
      const zip = new JSZip();
      const cache = {};
      let block = document.querySelectorAll(".block");
      for (let index = 0; index < block.length; index++) {
        var myCanvas = block[index].getElementsByTagName("canvas")[0];
        let data = myCanvas.toDataURL("image/png");
        let fileName = `${this.selectPortCode}-${index+1}`
        zip.file(fileName + ".png", data.substring(22), { base64: true });
        cache[fileName] = data;
      }
      zip.generateAsync({ type: "blob" }).then(content => {
        // 生成二进制流
        FileSaver.saveAs(content, `${this.selectPortCode}端口二维码.zip`); // 利用file-saver保存文件
      });
    }
  }
};
</script>

<style lang="less">
.qrcodefroport {
  width: 100%;
  .title {
      padding: 20px;
      text-align: center;
      font-size: 18px;
  }
  .qr_content {
    overflow: auto;
    height: 70vh;
    .block {
      float: left;
      width: 200px;
      padding: 0 20px 20px 20px;
      .demonstration {
        width: 100%;
        display: inline-block;
        text-align: center;
        margin-top: 5px;
      }
    }
  }
  .port_code {
      padding-top: 15px;
      text-align: center;
  }
}
</style>