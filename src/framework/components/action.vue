<template>
  <span>
    <a-button type="primary" @click="onRequest">{{text}}</a-button>
    <a-modal
      v-if="used_modal"
      :title="text+'对话框'"
      :visible="visible"
      @ok="handleOk"
      @cancel="visible=false"
    >
      <slot></slot>
    </a-modal>
  </span>
</template>
<script>
import { message } from "ant-design-vue";
export default {
  name: "YingAction",
  props: {
    text: String,
    request: {
      type: [String, Function],
    },
    data: null,
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    console.log(this);
  },
  computed: {
    used_modal() {
      return this.$scopedSlots.default;
    },
  },
  methods: {
    onRequest() {
      if (this.used_modal) {
        this.visible = true;
        return;
      }
      this.handleRequest(this.data);
    },
    handleRequest(data) {
      return Promise.resolve()
        .then(() => {
          if (typeof this.request === "string") {
            return this.$request.post(this.request, { ...data });
          } else if (typeof this.request === "function") {
            return this.request.apply(this, [{ ...data }]);
          } else {
            return Promise.reject({ message: "request param type error" });
          }
        })
        .then(
          (response) => {
            message.info(`${this.text}操作成功`);
            this.visible = false;
          },
          (err) => {
            message.warning(`对不起，操作异常。${err.message}`);
          }
        );
    },
    handleOk() {
      this.handleRequest(this.data);
    },
  },
};
</script>