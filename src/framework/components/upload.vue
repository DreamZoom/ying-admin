<template>
  <div style="padding-top: 10px">
    
    <a-upload
      name="file"
      list-type="picture-card"
      class="ying-uploader"
      :show-upload-list="false"
      :action="action"
      @change="handleChange"

      style="min-width:100px;max-width:300px;min-height:100px"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:100%;height:auto;" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <p>
      图片上传建议尺寸为 宽度:{{ size.width }} 高度: {{ size.height }}。
      <span @click="handleClear"><a-tag color="#f00"> 清除上传 </a-tag></span>
    </p>
  </div>
</template>
<script>
export default {
  name: "YingUpload",
  props: {
    value: null,
    action: String,
    prefix: "",
    size: {
      type: Object,
      default: () => {
        return {
          width: 100 + "px",
          height: 100 + "px",
        };
      },
    },
  },
  data() {
    return {
      loading: false,
      imageUrl: "",
    };
  },
  mounted() {
    this.imageUrl = this.value;
  },
  methods: {
    handleChange({ file, fileList }) {
      if (file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (file.status === "done") {
        // Get this url from response in real world.
        this.imageUrl = this.prefix + file.response.data.fileName;
        this.$emit("input", this.imageUrl);
        this.loading = false;
      }
    },
    handleClear() {
      this.imageUrl = "";
      this.$emit("input", this.imageUrl);
    },
  },
};
</script>
<style>
.ying-uploader {
  padding: 8px;
}
.ying-uploader .ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 100%;
}
.ying-uploader .ant-upload.ant-upload-select-picture-card img {
  width: 100%;
  height: 100%;
}
.ying-uploader .ant-upload.ant-upload-select-picture-card > .ant-upload {
  padding: 0px;
}
</style>