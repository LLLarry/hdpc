<template>
  <div class="uploadfile">
    <el-upload
      class="upload-demo"
      name="file"
      :with-credentials="true"
      drag
      :action="`${baseURL}/fileDispose/upload`"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">请选择文件并上传</div>
    </el-upload>
  </div>
</template>

<script>
export default {
    props: ['baseURL']
};
</script>