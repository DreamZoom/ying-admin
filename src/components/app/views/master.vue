<template>
  <layout :config="config" :side="$store.getters.slide">
    <div slot="logo">管理系统</div>
    <div slot="main-menu">
      <component :is="$store.getters.main_menus"></component>
    </div>
    <div slot="side-menu">
      <component :is="$store.getters.slide_menus"></component>
    </div>
    <div slot="tools-menu">
      <component :is="$store.getters.tools_menus"></component>
    </div>
    <router-view />
  </layout>
</template>

<script>
import layout from "../layout";
import Vue from "vue";
export default {
  name: "App",
  components: {
    layout
  },
  data() {
    return {
      main_menus: null
    };
  },
  mounted() {},
  methods: {
    config(setting) {}
  }
};
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
