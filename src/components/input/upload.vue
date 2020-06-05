<template>
    <el-upload class="upload-demo" :action="action" multiple  :show-file-list="false" :on-success="handleUploadSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
            <ul class="el-upload-list" :class="{'el-upload-list--picture':type=='image'}" v-for="(item,i) in files" :key="i">
                <li class="el-upload-list__item is-success">
                    <img :src="item" :alt="item" class="el-upload-list__item-thumbnail" :style="size" v-if="type=='image'">
                    <a class="el-upload-list__item-name" v-if="type=='file'"><i class="el-icon-document"></i>{{item}}</a>
                    <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
                    <i class="el-icon-close" @click="handleClose(i)"></i>
                </li>
                
            </ul>
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
            avater: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: "file" // type enum file,image,avater
            },
            value: String,
            size: {
                type: Object,
                default: {}
            },
            action: {
                type: String,
                default: function() {
                    console.log(this);
                    if (this.$config) {
                        if (this.$config.upload_action) {
                            return this.$config.upload_action;
                        }
                    }
                    return "/api/store/file/upload";
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
        watch: {
            value(newValue, oldValue) {
                if (newValue != oldValue) {
                    this.files = [];
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
            },
            handleClose(i){
                this.files.splice(i,1);
                this.$emit("input", this.files.join(","));
            }
        }
    }
</script>
