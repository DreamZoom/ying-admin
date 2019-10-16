<template>
    <el-upload class="upload-demo" :action="action" multiple :limit="3" :show-file-list="false" :on-success="handleUploadSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
            <div v-for="(item,i) in files" :key="i">
                {{item}}
            </div>
        </div>
    </el-upload>
</template>
<script>
    export default {
        name: "YingUpload",
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: "file"// type enum file,image
            },
            value: String,
            action: {
                type: String,
                default: function() {
                    console.log(this);
                    if (this.$config) {
                        if (this.$config.upload_action) {
                            return this.$config.upload_action;
                        }
                    }
                    return "http://localhost:38081/api/store/file/upload";
                }
            }
        },
        data() {
            return {
                files: []
            }
        },
        mounted() {
            this.bindValue(this.value);
        },
        watch:{
            value(newValue,oldValue){
                if(newValue!=oldValue){
                    this.files=[];
                    this.bindValue(newValue);
                }
            }
        },
        methods: {
            handleUploadSuccess(response, file) {
                console.log(response);
                if (response.result) {
                    this.bindValue(response.data.fileUrl);
                    this.$emit("input", this.files.join(","));
                }
            },
            bindValue(value) {
                if (value) {
                    var filelist = value.split(",");
                    if (this.multiple) {
                        filelist.map((f) => {
                            if (f) {
                                this.files.push(f);
                            }
                        })
                    } else {
                        this.files = [];
                        this.files.push(value);
                    }
                }
            }
        }
    }
</script>
