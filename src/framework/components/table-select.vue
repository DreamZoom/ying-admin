<template>
  <div>
    <a-tag v-for="(item,i) in selecteds" :key="i">{{item[nameKey]}}</a-tag>
    <a-button type="link" @click="visible=true">请选择</a-button>
    <a-modal title="请选择" :visible="visible" @ok="handleOk" @cancel="visible=false" width="60%">
      <ying-table v-bind="{...tableProps}" :show-header="false" :multiple="multiple" ref="table">
        <slot></slot>
      </ying-table>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "YingTableSelect",
  props: {
    tableProps: Object,
    valueKey: {
      type: String,
      default: "id",
    },
    nameKey: {
      type: String,
      default: "name",
    },
    value: null,
    request: {
      type: [String, Function],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      selecteds: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const keys = (this.value || "").split(",");
      this.$task.run(this.request, { keys }).then((response) => {
        this.selecteds = response.data || [];
      });
    },
    handleOk() {
      this.selecteds = this.$refs.table.getSelecteds();
      this.$emit(
        "input",
        this.selecteds.map((m) => m[this.valueKey]).join(",")
      );
      this.visible = false;
    },
  },
};
</script>