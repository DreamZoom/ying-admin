<template>
  <ying-page>
    <ying-table request="/api/news/channel/page-list" :columns="columns"></ying-table>
  </ying-page>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          dataIndex: "id",
          title: "栏目编号",
        },
        {
          dataIndex: "name",
          title: "栏目名称",
          filters: [
            { text: "Male", value: "male" },
            { text: "Female", value: "female" },
          ],
        },
      ],
    };
  },
};
</script>