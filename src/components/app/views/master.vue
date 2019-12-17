<template>
  <ying-layout :config="config" :side="$store.getters.side">
    <div slot="logo">
      <img class="logo" src="https://file.iviewui.com/pro-app-dist/img/logo-small.49312e7c.png" alt="">
    </div>
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
  img.logo{
    display: block;
    width: 52px;
    height: 52px;
    line-height: 52px;
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 2;
    background: #2d8cf0;
    color: #fff;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
    transition: all .2s ease-in-out;
  }
</style>
