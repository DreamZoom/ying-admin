<template>
  <a-layout class="ying-app">
    <a-layout-sider
      class="ying-app-slider"
      :width="256"
      v-model="collapsed"
      :trigger="null"
      collapsible
      :theme="$app.getters.theme"
    >
      <div class="ying-app-logo" :class="$app.getters.theme">
        <slot name="logo">
          <a>
            <img :src="$app.getters.logo" alt="logo" />
            <h1 v-if="!collapsed">{{ $app.getters.title }}</h1>
          </a>
        </slot>
      </div>
      <component class="ying-menu" :is="$app.getters.menus"></component>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0px">
        <div class="ying-app-header">
          <span class="ying-app-trigger" @click="collapsed = !collapsed">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </span>
          <div class="ying-app-header-left">
            <slot name="header-left"></slot>
          </div>
          <div class="ying-app-header-right">
            <slot name="header-right"></slot>
            <slot name="header-user">
              <div
                class="ying-app-header-action"
                v-if="$app.getters.authorized"
              >
                <div>
                  <a-icon type="user" />
                  <span>{{ $app.getters.user.username }}</span>
                </div>
              </div>
              <div class="ying-app-header-action"
                v-if="$app.getters.authorized" @click="logout">
                <div><span>注销</span></div>
              </div>
            </slot>

            <div class="ying-app-header-action">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link">
                  <a-icon type="dashboard" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a @click="$app.commit('setTheme', 'dark')">黑色经典</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="$app.commit('setTheme', 'light')">白色通用</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <slot>
          <router-view></router-view>
        </slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: "YingLayout",
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    logout(){
      this.$app.commit('logout');
      this.$router.push('/login');
    }
  },
};
</script>
<style>
.ying-app {
  height: 100%;
  position: relative;
}
.ying-app-logo {
  position: relative;
  padding: 0 24px;
  overflow: hidden;

  cursor: pointer;
  transition: all 0.3s;
}
.ying-app-logo.dark {
  background: #001529;
}
.ying-app-logo.light {
  background: #fff;
  color: #001529;
}
.ying-app-logo > a {
  display: flex;
  align-items: center;
  height: 64px;
}
.ying-app-logo img {
  display: inline-block;
  height: 32px;
  vertical-align: middle;
}
.ying-app-logo h1 {
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  vertical-align: middle;
  animation: fade-in;
  animation-duration: 0.3s;
  text-overflow: hidden;
  white-space: nowrap;
}
.ying-app-logo.light h1 {
  color: #001529;
}
.ying-app-trigger {
  height: 64px;
  padding: 0 24px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s, padding 0s;
}
.ying-app-slider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
}
.ying-app-slider .ying-menu {
  position: absolute;
  top: 64px;
  width: 100%;
  bottom: 0px;
  overflow-y: auto;
}

.ying-app-slider .ying-menu::-webkit-scrollbar {

  width: 5px; 
  height: 1px;
}
.ying-app-slider .ying-menu::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.ying-app-slider .ying-menu::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #001529;
}
.ying-app-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.ying-app-header-right {
  display: flex;
  float: right;
  height: 64px;
  margin-left: auto;
  overflow: hidden;
}
.ying-app-header-action {
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
}
.ying-app-header-action:hover {
  background-color: #efefef;
}
.ying-message-list {
  min-width: 350px;
}
.ying-message-item {
  border-bottom: solid 1px #eee !important;
}
</style>