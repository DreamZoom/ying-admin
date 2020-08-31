<template>
  <div>
    <a-button type="primary" @click="visible=true">选择</a-button>
    <a-modal title="请选择" :visible="visible" @ok="handleOk" @cancel="visible=false" width="60%" >
      <ying-table v-bind="{...tableProps}" :show-header="false" @selectedChange="(val)=>selecteds=val">
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
    valueKey: String,
    nameKey: String,
  },
  data() {
    return {
      visible: false,
      selecteds:[]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    handleOk() {},
  },
};
</script>