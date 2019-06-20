<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YingTableAction",
  props: {
    text: String,
    name: String
  },
  mounted() {
    console.log(this.$parent.$vnode.componentOptions.tag);
    const tag = this.$parent.$vnode.componentOptions.tag;

    let parent = this.$parent;
    while(parent!=null&&parent.$vnode.componentOptions.tag!="ying-table-actions"){
        parent = parent.$parent;
    }

    if (parent && parent.$vnode.componentOptions.tag == "ying-table-actions") {
      parent.addAction(this.text, this.name);
    } else {
      console.warn("该组件的父组件必须是YingTableActions");
    }
  }
};
</script>
