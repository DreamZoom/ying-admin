<template>
  <div id="app">
    <ying-layout :config="config">
      <div slot="logo">管理控制台</div>
      <div slot="side-menu">
        <ying-menu :menus="$store.state.menus"></ying-menu>
      </div>
      <div slot="header-menu">
        <el-menu-item index="1">
          消息中心 ({{$store.state.count}})</el-menu-item>
        <el-submenu index="2">
          <div slot="title">{{$store.getters.username}}</div>
          <el-menu-item index="2-1">修改密码</el-menu-item>
          <el-menu-item index="2-2">注销登录</el-menu-item>
        </el-submenu>
      </div>
      <router-view/>
    </ying-layout>
  </div>
</template>

<script>
  import menu from "./menu";
  export default {
    name: 'App',
    components:{
      YingMenu:menu
    },
    methods: {
      config(setting) {
        setting.tools.push({
          icon: "el-icon-s-opportunity",
          click: (item) => {
            console.log(item);
          }
        });
        setting.tools.push({
          icon: "el-icon-setting",
          click: (item) => {
            console.log(this);
          }
        });
        setting.menu.router = true;
        setting.menu["default-active"] = this.$route.path;
        console.log(this.$route)
      }
    }
  }
</script>

<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
</style>
