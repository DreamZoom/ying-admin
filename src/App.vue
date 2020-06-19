<template>
  <ying-app :config="config"></ying-app>
</template>

<script>
import config from "./config"
export default {
  name: "App",
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    config() {
      return Promise.resolve(config);
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
