<template>
  <ying-layout :config="config">
    <div slot="logo">管理控制台</div>
    <div slot="main-menu">
      <component :is="$store.getters.main_menus"></component>
    </div>
    <div slot="side-menu">
       <component :is="$store.getters.slide_menus"></component>
    </div>
    <div slot="tools-menu">
      <component @select="handleClick" :is="$store.getters.tools_menus"></component>  
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
    
      },
      handleClick(){
        console.log(111);
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
