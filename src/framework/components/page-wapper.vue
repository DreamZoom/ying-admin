<template>
  <div class="ying-page-wapper">
      <slot>
          新页面从这里开始
      </slot>
  </div>
</template>
<script>
export default {
    name:"YingPageWapper"
}
</script>
<style scoped>
.ying-page-wapper {
  position: relative;
  margin: 24px;
  transition: all 0.2s;
}
</style>