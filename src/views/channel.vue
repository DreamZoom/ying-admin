<template>
  <ying-page-wapper>
    <ying-tree :service="service()" ref="tree">
      <template slot="action" slot-scope="{selecteds}">
        <a-button
          icon="plus"
          size="small"
          @click="modal().form().then(()=>{this.$refs.tree.refresh()})"
        >添加</a-button>
        <a-button
          icon="delete"
          size="small"
          @click="modal().batchDelete({rows:selecteds}).then(()=>{this.$refs.tree.refresh()})"
        >删除</a-button>
      </template>
      <template slot-scope="{model}">
        <div>{{model.title}}</div>
        <a-button type="link" @click="modal().form({model:record,create:false}).then(()=>{this.$refs.table.refresh()})">编辑</a-button>
      </template>
    </ying-tree>
  </ying-page-wapper>
</template>

<script>
import channelService from "../service/channel";
import ui from "../framework/index";
const { ActionModal } = ui;
export default {
  data() {
    return {
      treeData: []
    };
  },
  mounted() {
    channelService.tree().then(response => {
      this.treeData = response.data;
    });
  },
  methods: {
    service() {
      return channelService;
    },
    modal() {
      return new ActionModal({
        service: channelService,
        template: `
                  <a-form-model-item label="Activity name">
                    <a-input v-model="form.name" />
                  </a-form-model-item>
                  `
      });
    }
  }
};
</script>