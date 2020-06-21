<template>
  <ying-page-wapper>
    <a-page-header
      title="修改密码"
      sub-title="change your password"
    />
    <a-card :bordered="false">
      <a-form :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            placeholder="账户"
            v-decorator="['username', { rules: [{ required: true, message: '请输入账户!' }] }]"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            type="password"
            placeholder="密码"
            v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            type="password"
            placeholder="新密码"
            v-decorator="['newpassword', { rules: [{ required: true, message: '请输入新密码!' }] }]"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </ying-page-wapper>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.dispatch("changepassword", { ...values }).then(
            data => {
              this.$router.push({ path: "/" });
              this.$message.info("密码修改成功");
              console.log(data);
            },
            err => {
              if (err.response.status != 200) {
                this.$message.error("密码修改失败");
              }
              console.log(err);
            }
          );
        }
      });
    }
  }
};
</script>