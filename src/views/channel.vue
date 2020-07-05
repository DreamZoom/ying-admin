<template>
  <ying-page-wapper>
    <ying-tree :service="service()"></ying-tree>
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