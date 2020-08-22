<template>
  <div class="ying-login-box">
    <div class="ying-login-header">
      <h3>
        <img :src="$app.getters.logo" alt />
        {{$app.getters.title}}
      </h3>
    </div>
    <a-form :form="form" class="login-form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          placeholder="用户名"
          v-decorator="['username', { rules: [{ required: true, message: '请输入账户!' }] }]"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          placeholder="密 码"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        
        <a-button type="primary" html-type="submit" block>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props:{
      handleLogin:{
        type:Function,
        default:()=>{

        }
      }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "login" }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.handleLogin().then(()=>{
            
          })
        }
      });
    },
  },
};
</script>
<style scoped>
.ying-login-box {
  margin: auto;
  padding: 60px auto;
  width: 300px;
}
.ying-login-header {
  text-align: center;
  padding: 40px;
}
.login-form-forgot {
  float: right;
}
</style>