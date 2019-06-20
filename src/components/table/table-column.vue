<template>
  <el-table-column :prop="prop" :label="label">
    <slot></slot>
  </el-table-column>
</template>
<script>
export default {
  name: "YingTableColumn",
  props: {
    label: String,
    prop:String
  }
};
</script>
