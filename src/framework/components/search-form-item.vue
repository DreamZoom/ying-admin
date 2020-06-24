<template>
  <a-col :span="8">
    <a-form-item :label="label" class="ying-search-item">
      <slot></slot>
    </a-form-item>
  </a-col>
</template>
<script>
export default {
    name:"YingSearchItem",
    props:{
        label:String
    }
}
</script>
<style>
.ying-search-item{
  display: flex;
}
.ying-search-item .ant-form-item-control-wrapper {
  flex: 1;
}
</style>