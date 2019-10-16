<template>
    <div>
        <el-checkbox-group v-if="multiple" v-model="choses" @change="handleChange">
            <el-checkbox v-for="(item,i) in values" :key="i" :label="item.name">{{item.text}}</el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="!multiple" v-model="chose" @change="handleChange">
            <el-radio v-for="(item,i) in values" :key="i" :label="item.name">{{item.text}}</el-radio>
        </el-radio-group>
    </div>
</template>
<script>
    export default {
        name: "YingChose",
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            values: {
                type: Array,
                default: () => []
            },
            value: String
        },
        data() {
            return {
                chose: "",
                choses: []
            }
        },
         watch: {
            value(newValue, oldValue) {
                this.bindValue(newValue||"");
            }
        },
        mounted(){
            this.bindValue(this.value||"");
        },
        methods: {
            bindValue(value){
                this.chose=value;
                this.choses=value.split(",");
                console.log(this.choses);
            },
            handleChange() {
                if(this.multiple){
                    this.$emit("input", this.choses.join(","));
                }
                else{
                    this.$emit("input", this.chose);
                }
                console.log(this.chose)
            }
        }
    }
</script>
