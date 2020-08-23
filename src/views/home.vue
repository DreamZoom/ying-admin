<template>
  <ying-page-wapper>
    <div>
      <ying-action request="/api/news/channel/save" text="编辑" :data="row">
        <p>姓名:{{row.name}}</p>
        <p>年龄:{{row.age}}</p>
      </ying-action>
    </div>
  </ying-page-wapper>
</template>
<script>
export default {
  data() {
    return {
      row: {
        name: "wxl",
        age: 18,
      },
    };
  },
};
</script>