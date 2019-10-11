<template>
    <div>
        <el-button size="small" @click="dialogVisible=true">{{selectText||"请选择"}}</el-button>
        <el-dialog title="选择" :visible.sync="dialogVisible" width="50%" append-to-body>
            <ying-table :base="base" :config="config" :show_toolbar="false" :multiple="multiple" ref="table">
                <ying-table-column prop="appName" label="应用名称"></ying-table-column>
                <ying-table-column prop="appDesc" label="应用描述"></ying-table-column>
                <ying-table-column prop="clientId" label="应用ID"></ying-table-column>
            </ying-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleOk">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "YingSelect",
        props: {
            base:String,
            keyField: String,
            nameField: String,
            fields: [],
            multiple: {
                type: Boolean,
                default: false
            },
            value: {
                type: String
            }
        },
        data() {
            return {
                dialogVisible: false,
                selections: [],
            }
        },
        computed: {
            selectText() {
                if (this.multiple) {
                    var val_list = [];
                    this.selections.map((val) => {
                        val_list.push(val[this.nameField] || val[this.keyField]);
                    });
                    return val_list.join(",");
                } else {
                    console.log(this.selections);
                    if (this.selections.length > 0) {
                        const val = this.selections[0];
                        return val[this.nameField] || val[this.keyField];
                    }
                    return "";
                }
            }
        },
        watch:{
            "value":(newValue,oldValue)=>{
                if(newValue){
                    this.loadValue(newValue);
                }
                console.log(oldValue);
            }
        },
        mounted(){
            this.loadValue(this.value);
        },
        methods: {
            config(source, config) {
                config.batch_actions = [];
                config.actions = [];
                // config.show_toolbar=false;             
            },
            handleOk() {
                this.dialogVisible = false;
                this.selections = this.$refs.table.getSelections();
                this.bindValue();
            },
            loadValue(keyValue){
                 var url = this.base +"find-by-keys";
                 this.$http.get(url,{key:this.keyField,values:keyValue}).then((response)=>{
                     if(response.result){
                         this.selections = response.data;
                     }
                 })
            },
            bindValue() {
                var value = "";
                if (this.multiple) {
                    var val_list = [];
                    this.selections.map((val) => {
                        val_list.push(val[this.keyField]);
                    });
                    value = val_list.join(",");
                } else {
                    console.log(this.selections);
                    if (this.selections.length > 0) {
                        const val = this.selections[0];
                        value = val[this.keyField];
                    } else {
                        value = "";
                    }
                }
                this.$emit('input', value);
            }
        }
    }
</script>

