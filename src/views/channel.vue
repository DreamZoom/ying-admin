<template>
  <ying-page-wapper>
    <ying-table :service="service" title="栏目列表" ref="table">
      <template slot="search" slot-scope="{model}">
        <ying-search-item label="用户名">
          <a-input v-model="model.username" placeholder="username" />
        </ying-search-item>
        <ying-search-item label="昵称">
          <a-input v-model="model.nickname" placeholder="username" />
        </ying-search-item>
        <ying-search-item label="身份证号">
          <a-input v-model="model.idcard" placeholder="username" />
        </ying-search-item>
        <ying-search-item label="等级">
          <a-input v-model="model.level" placeholder="username" />
        </ying-search-item>
        <ying-search-item label="等级">
          <a-input v-model="model.level" placeholder="username" />
        </ying-search-item>
      </template>
      <template slot="batch-action" slot-scope="{rows}">
        <a-button type="primary" @click="modal().form().then(()=>{this.$refs.table.reload()})">
          <a-icon type="plus" />创建
        </a-button>
        <a-button type="danger" @click="modal().batchDelete({rows:rows}).then(()=>{this.$refs.table.reload()})">
          <a-icon type="delete" />删除
        </a-button>
      </template>
      <template slot="action" slot-scope="{record}">
        <a-button type="link" @click="modal().form({model:record,create:false}).then(()=>{this.$refs.table.reload()})">编辑</a-button>
        <a-button type="link" @click="modal().delete({model:record}).then(()=>{this.$refs.table.reload()})">删除</a-button>
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