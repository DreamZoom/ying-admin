<template>
  <div class="ying-page">
      <slot>
          新页面从这里开始
      </slot>
  </div>
</template>
<script>
export default {
    name:"YingPage"
}
</script>
<style scoped>
.ying-page {
  position: relative;
  margin: 24px;
  transition: all 0.2s;
  min-height: 100%;
}
</style>