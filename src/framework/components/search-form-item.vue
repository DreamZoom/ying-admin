<template>
  <a-col :span="8">
    <a-form-item :label="label" class="ying-search-item">
      <slot></slot>
    </a-form-item>
  </a-col>
</template>
<script>
export default {
  name: "YingSearchItem",
  props: {
    label: String
  },
  mounted() {
    const parent = this.getParent();
    parent.addChild(this);
    console.log(parent);
  },
  methods:{
    getParent(){
      let parent = this.$parent;
      while(parent&& parent.$options._componentTag!=="ying-search-form"){
        parent = parent.$parent;
      }
      return parent;
    }
  }
};
</script>
<style>
.ying-search-item {
  display: flex;
}
.ying-search-item .ant-form-item-control-wrapper {
  flex: 1;
}
</style>