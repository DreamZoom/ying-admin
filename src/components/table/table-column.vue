<template>
  <el-table-column :prop="prop" :label="label">
    <template slot-scope="scope" >
      <slot ...scope>
        <img v-if="image" :src="scope.row[scope.column.property]" :alt="scope.row[scope.column.property]"  :style="size" >
        <span v-if="!image">
          {{scope.row[scope.column.property]}}
        </span>
      </slot>
    </template>
  </el-table-column>
</template>
<script>
  export default {
    name: "YingTableColumn",
    props: {
      label: String,
      prop: String,
      image: {
        type: Boolean,
        default: false
      },
      size: Object
    },
    mounted() {
    },
    methods: {
      log(o) {
        console.log(o)
      }
    }
  };
</script>
