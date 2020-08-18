<template>
  <div class="ying-login-box">
    <div class="ying-login-header">
      <h3>
        <img :src="$app.getLogo()" alt />
        {{$app.getTitle()}}
      </h3>
    </div>
    <a-form :form="form" class="login-form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          placeholder="Username"
          v-decorator="['username', { rules: [{ required: true, message: '请输入账户!' }] }]"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          placeholder="Password"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-decorator="['remember']" checked>记住密码</a-checkbox>
        <a class="login-form-forgot">忘记密码</a>
        <a-button type="primary" html-type="submit" block>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
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
          // this.$store.dispatch("login", { ...values }).then(data => {
          //   this.$router.push({ path: "/" });
          //   console.log(data);
          // });
        }
      });
    }
  }
};
</script>
<style scoped>
.ying-login-box {
  margin: 60px auto;
  width: 300px;
}
.ying-login-header {
  text-align: center;
  margin: 40px;
}
.login-form-forgot {
  float: right;
}
</style>