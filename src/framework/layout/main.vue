<template>
  <a-layout class="ying-app">
    <a-layout-sider
      class="ying-app-slider"
      :width="256"
      v-model="collapsed"
      :trigger="null"
      collapsible
      :theme="$store.getters.theme"
    >
      <div class="ying-app-logo" :class="$store.getters.theme">
        <a>
          <img :src="$store.state.logo" alt="logo" />
          <h1 v-if="!collapsed">{{$store.state.title}}</h1>
        </a>
      </div>
      <component :is="$store.getters.menus"></component>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="ying-app-header">
          <span class="ying-app-trigger" @click="collapsed = !collapsed">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </span>
          <div class="ying-app-header-right">
            <div class="ying-app-header-right-action">
              <a-dropdown :trigger="['click']" >
                <div>
                  <a-icon type="mail" />
                  <span>消息</span>
                </div>
                <div slot="overlay"  >
                  <a-card class="ying-message-list" @click="e => e.stopPropagation()">
                    <a-list item-layout="horizontal" :data-source="$store.getters.messages">
                      <a-list-item class="ying-message-item" slot="renderItem" slot-scope="item">
                        <a-list-item-meta :description="item.content">
                          <a slot="title">{{ item.title }}</a>
                        </a-list-item-meta>
                        <a slot="actions" @click="showMessage(item)">详情</a>
                        <a slot="actions" @click="removeMessage(item)">删除</a>
                      </a-list-item>
                    </a-list>
                  </a-card>
                </div>
              </a-dropdown>
            </div>
            <div class="ying-app-header-right-action" v-if="$store.getters.login">
              <a-dropdown>
                <div>
                  <a-icon type="user" />
                  <span>{{$store.state.user.username}}</span>
                </div>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <router-link :to="{path:'/changepassword'}">修改密码</router-link>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item>
                    <a @click="logout">退出</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
            <div class="ying-app-header-right-action">
              <a-dropdown>
                <a class="ant-dropdown-link">
                  <a-icon type="dashboard" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a @click="setTheme('dark')">黑色经典</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="setTheme('light')">白色通用</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      dataSource: ["Burns Bay Road", "Downing Street", "Wall Street"],
      data: [
        {
          title: "Ant Design Title 1"
        },
        {
          title: "Ant Design Title 2"
        },
        {
          title: "Ant Design Title 3"
        },
        {
          title: "Ant Design Title 4"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: "/login" });
      });
    },
    setTheme(theme) {
      this.$store.commit("setTheme", theme);
    },
    showMessage(message) {
      const { title, content } = message;
      this.$info({ title,content});
    },
    removeMessage(message){
      this.$store.commit("removeMessage", message);
    }
  }
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
.ying-app-header-right-action {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
}
.ying-app-header-right-action:hover {
  background-color: #efefef;
}
.ying-message-list {
  min-width: 350px;
}
.ying-message-item {
  border-bottom: solid 1px #eee !important;
}
</style>