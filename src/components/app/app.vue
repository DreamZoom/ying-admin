<template>
   <component :is="innerView" />
</template>
<script>
import Router from "vue-router";
import store from "./store";
import router from "./router";
import master from "./views/master.vue";
import login from "./views/login.vue";

let masters = {};

export default {
  name: "YingApp",
  props: {
    config: {
      type: Function,
      default: context => {
        console.log(this);
      }
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      innerView:{template:"<p>welcome</p>"},
      masters: {},
      routes: []
    };
  },
  methods: {
    init() {
      this.master("main", master);
      this.config(this);
      this.innerView = {
        router,
        store,
        template: "<router-view />"
      };
      console.log(this.innerView);
    },
    menu(key, menus) {
      store.commit("menu", {
        key,
        menus
      });
    },
    push(location) {
      this.$router.push(location);
    },
    route(options) {
      if (options.master && masters[options.master]) {
        var master = masters[options.master];
        options.component = {
          template: "<master><page /></master>",
          components: { master: master, page: options.component }
        };
      }
      router.addRoutes([options]);
    },
    master(key, component) {
      masters[key] = component;
    }
  }
};
</script>
