<template>
  <el-table-column :label="label">
    <template slot-scope="scope">
      <el-button type="text" size="small" @click="handleClick('update',scope.row)">编辑</el-button>
      <el-button type="text" size="small" @click="handleClick('delete',scope.row)">删除</el-button>
      <el-button type="text" size="small" v-for="(item,i) in actions" :key="i"  @click="handleClick(item.name,scope.row)">{{item.text}}</el-button>
    </template>
    <div style="display:none"><slot></slot></div>
  </el-table-column>
</template>
<script>
export default {
  name: "YingTableActions",
  props: {
    label: {
      type: String,
      default: "操作"
    }
  },
  data() {
    return {
      actions: []
    };
  },
  mounted() {
    let parent = this.$parent;
    while(parent!=null&&parent.$vnode.componentOptions.tag!="ying-table"){
        parent = parent.$parent;
    }
    if (parent && parent.$vnode.componentOptions.tag == "ying-table") {
      this.$$$parent = parent;
    } else {
      console.warn("该组件的父组件必须是YingTableActions");
    }
    console.log(this.$children);
  },
  methods: {
    addAction(text, name) {
      this.actions.push({
        text,
        name
      });
      console.log(this.actions);
    },
    handleClick(action,row){
      console.log(row);
      let parent = this.$$$parent;
      if(parent&&parent.triggerCommand&& typeof parent.triggerCommand == 'function'){
        parent.triggerCommand(action,row);
      }
    }
  }
};
</script>
