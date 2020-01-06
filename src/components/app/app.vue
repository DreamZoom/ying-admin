<template>
  <router-view />
</template>
<script>
import router from "./router";
import store from "./store";
import master from "./views/master.vue";
export default {
  name: "YingApp",
  router,
  store,
  mounted() {
    //this.addMenu("message", "sys_msg", "系统消息", "");
  },
  props: {
    config: {
      type: Function,
      default: context => {
        console.log(this);
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.config(this);
      router.addRoutes([
        {
          path: "/",
          name: "main",
          component: master,
          children: store.getters.routes
        }
      ]);
    },
    addRoutes(routes) {
      router.addRoutes(routes);
    },
    addRoute(path, component, childs) {
      store.commit("addRoute", {
        path: path,
        name: path.replace("/", "_"),
        component: component,
        children: childs
      });
    },
    config_menu(key, menus) {
      store.commit("menu", {
        key,
        menus
      });
    },
    push(location) {
      this.$router.push(location);
    }
  }
};
</script>
