<template>
  <ying-layout :config="config" :side="$store.getters.side">
    <div slot="logo">管理控制台</div>
    <div slot="main-menu">
      <component :is="$store.getters.main_menus"></component>
    </div>
    <div slot="side-menu">
       <component :is="$store.getters.slide_menus"></component>
    </div>
    <div slot="tools-menu">
      <component :is="$store.getters.tools_menus"></component>  
    </div>
    <router-view/>
  </ying-layout>
</template>

<script>
  import menu from "./menu";
  import Vue from "vue";
  export default {
    name: 'App',
    components: {
      YingMenu: menu
    },
    data() {
      return {
        main_menus: null
      }
    },
    mounted() {
    },
    methods: {
      config(setting) {
    
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
