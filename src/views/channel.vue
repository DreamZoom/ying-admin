<template>
  <ying-page-wapper>
    <ying-table :service="service" title="栏目列表">
      <template slot="batch-action" slot-scope="{rows}">
        <a-button type="primary" @click="modal().form()">
          <a-icon type="plus" />创建
        </a-button>
        <a-button type="danger" @click="modal().batchDelete({rows:rows})">
          <a-icon type="delete" />删除
        </a-button>
      </template>
      <template slot="action" slot-scope="{record}">
        <a-button type="link" @click="modal().form({model:record,create:false})">编辑</a-button>
        <a-button type="link" @click="modal().delete({model:record})">删除</a-button>
      </template>
    </ying-table>
  </ying-page-wapper>
</template>

<script>
import channelService from "../service/channel";
import ui from "../framework/index";
const { ActionModal } = ui;
export default {
  data() {
    return {};
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