<template>
  <el-table-column :label="label">
    <template slot-scope="scope">
      <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
      <el-button type="text" size="small">删除</el-button>
      <el-button type="text" size="small" v-for="(item,i) in actions" :key="i">{{item.text}}</el-button>
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
    console.log(this.$children);
  },
  methods: {
    addAction(text, name) {
      this.actions.push({
        text,
        name
      });
      console.log(this.actions);
    }
  }
};
</script>
