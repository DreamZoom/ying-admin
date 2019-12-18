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
  created() {
      console.log(this);
    this.init();
  },
  props: {
    config: {
      type: Function,
      default: context => {
        console.log(this);
      }
    }
  },
  methods: {
    init() {
      this.addMenu(
        "main",
        "toggle-slide",
        "切换菜单",
        "el-icon-s-fold",
        menu => {
          console.log("切换菜单");
          console.log(menu);
          if (menu.icon == "el-icon-s-unfold") {
            menu.icon = "el-icon-s-fold";
          } else {
            menu.icon = "el-icon-s-unfold";
          }
          this.toggleSide();
        }
      );
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
    addMenu(parent, name, title, icon, action) {
      store.commit("addMenu", {
        parent,
        name,
        title,
        icon,
        action
      });
    },
    push(location) {
      this.$router.push(location);
    },
    toggleSide() {
      store.commit("toggleSide");
    }
  }
};
</script>
