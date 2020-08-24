<template>
  <ying-page-wapper>
    <ying-tree request="/api/news/channel/list">
      <template slot="action" slot-scope="{rows}">
        <ying-action
          text="编辑"
          :data="{...rows[0]}"
          request="/api/news/channel/save"
          action-type="primary"
        >
          <template slot-scope="{model}">
            <a-form-model-item label="用户名" prop="name">
              <a-input v-model="model.name" type="textarea" />
            </a-form-model-item>
          </template>
        </ying-action>
        <ying-action
          text="删除"
          :data="{...rows[0]}"
          request="/api/news/channel/save"
          action-type="danger"
        ></ying-action>
      </template>
      <div slot-scope="{rows}">
        <div v-for="(item,i) in rows" :key="i">{{item.name}}</div>
      </div>
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
      treeData: [],
    };
  },
  mounted() {
    channelService.tree().then((response) => {
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
                  `,
      });
    },
  },
};
</script>