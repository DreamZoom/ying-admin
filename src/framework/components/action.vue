<template>
  <span>
    <a-button :type="actionType" @click="onRequest" :disabled="disabled">{{text}}</a-button>
    <a-modal
      v-if="used_modal"
      :title="text+'对话框'"
      :visible="visible"
      width="60%"
      @ok="handleOk"
      @cancel="visible=false"
    >
      <a-form-model ref="editForm" v-bind="form" :model="model">
        <slot :model="model"></slot>
      </a-form-model>
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
    actionType: {
      type: String,
      default: "default",
    },
    form: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject:{
    $bus:{
      default:()=>null
    }
  },
  data() {
    return {
      visible: false,
      model: { ...this.data },
    };
  },
  mounted() {
    
  },
  computed: {
    used_modal() {
      return this.$scopedSlots.default;
    },
  },
  watch: {
    data(newValue, oldValue) {
      this.model = { ...this.model, ...newValue };
    },
  },
  methods: {
    onRequest() {
      if (this.used_modal) {
        this.visible = true;
        return;
      }
      this.handleRequest(this.model);
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
            this.$emit("success");
            if (this.$bus) {
              this.$bus.$emit("refresh");
            }
          },
          (err) => {
            message.warning(`对不起，操作异常。${err.message}`);
          }
        );
    },
    handleOk() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.handleRequest(this.model).then(() => {
            this.$refs.editForm.resetFields();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>