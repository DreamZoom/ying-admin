<template>
  <div ref="editor"></div>
</template>
<script>
import WangEditor from "wangeditor";
export default {
  name: "YingRichEditor",
  props: {
    fileServer: null,
    value: null,
    id: null,
  },
  mounted: function () {
    console.log(this);
    this.init();
  },
  destroyed: function () {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (this.editor) {
        var value = this.editor.txt.html();
        if (!(newValue === value)) {
          this.editor.txt.html(newValue);
        }
      }
    },
  },
  methods: {
    init: function () {
      var editor = this.$refs.editor;
      var context = this;
      this.editor = new WangEditor(editor);
      this.editor.config.uploadImgServer = this.fileServer;
      this.editor.config.uploadImgMaxSize = 100 * 1024 * 1024; // 2M
      this.editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
      this.editor.config.uploadFileName = "file";

      this.editor.config.uploadVideoServer = this.fileServer;
      this.editor.config.uploadVideoMaxSize = 50 * 1024 * 1024  // 10m
      this.editor.config.uploadVideoAccept = ['mp4']
      this.editor.config.uploadVideoName = 'file'

      this.editor.config.uploadImgHooks = {
        customInsert: function (insertImgFn, result) {
          // result 即服务端返回的接口
          console.log("customInsert", result);

          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(result.data.fileUrl);
        },
      };
      this.editor.config.onchange = function (html) {
        console.log(html);
        context.$emit("input", html);
      };
      this.editor.create();
      this.editor.txt.html(this.value);
    },
  },
};
</script>