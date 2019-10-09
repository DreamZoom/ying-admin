<template>
  <div id="app">
    <ying-layout :config="config">
      <template slot="side-menu">
               <el-submenu index="1">
                  <div slot="title">
                      <i class="el-icon-location"></i>
                      <span>导航一</span>
                  </div>
                  <el-menu-item-group title=" 分组一">
                      <el-menu-item index="1-1">选项1</el-menu-item>
                      <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                      <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4" title="选项4">
                      <div slot="title">
                          我的工作台
                      </div>
                      <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
              </el-menu-item>



</template>

<template slot="header-menu">
  <el-menu-item index="1">
    消息中心</el-menu-item>
  <el-submenu index="2">
    <div slot="title">Admin</div>
    <el-menu-item index="2-1">修改密码</el-menu-item>
    <el-menu-item index="2-2">注销登录</el-menu-item>
  </el-submenu>
</template>

        <router-view/>
    </ying-layout>
    
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      config(setting) {
        setting.tools.push({
          icon: "el-icon-s-opportunity",
          click: (item) => {
            console.log(item);
          }
        })
        setting.tools.push({
          icon: "el-icon-setting",
          click: (item) => {
            console.log(this);
          }
        })

        setting.menu.router=true;
      }
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
