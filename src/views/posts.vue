<template>
  <ying-page>
    <ying-table request="/api/news/channel/page-list" :columns="columns" title="文章管理">
      <template slot="batch-action" slot-scope="{rows}">
        <ying-action
          text="创建"
          :data="{name:'wxl'}"
          request="/api/news/channel/save"
          action-type="primary"
          :form="{rules:rules}"
        >
          <template slot-scope="{model}">
            <a-form-model-item label="用户名" prop="name">
              <a-input v-model="model.name" type="textarea" />
            </a-form-model-item>
          </template>
        </ying-action>
        <ying-action
          text="审核"
          request="/api/news/channel/save"
          action-type="primary"
          :disabled="rows.length==0"
          :data="{ids:rows.map(it=>it.name).join(',')}"
        >
          <div>
            <div v-for="(item,i) in rows" :key="i">
              <p>{{item.name}}</p>
            </div>
          </div>
        </ying-action>
      </template>

      <template slot="action" slot-scope="{record}">
        <ying-action
          text="编辑"
          :data="{...record}"
          request="/api/news/channel/save"
          action-type="primary"
          :form="{rules:rules}"
        >
          <template slot-scope="{model}">
            <a-form-model-item label="用户名" prop="name">
              <a-input v-model="model.name" type="textarea" />
            </a-form-model-item>
          </template>
        </ying-action>
        <ying-action
          text="删除"
          :data="{...record}"
          request="/api/news/channel/save"
          action-type="danger"
        ></ying-action>
      </template>
    </ying-table>
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
          title: "名称",
          filters: [
            { text: "Male", value: "male" },
            { text: "Female", value: "female" },
          ],
        },
        {
          dataIndex: "age",
          title: "年龄",
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    console.log(this.$refs.create);
  },
};
</script>