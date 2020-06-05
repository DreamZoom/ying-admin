<template>
  <router-view />
</template>
<script>
import router from "./router";
import store from "./store";
import master from "./views/master.vue";
import changepassword from "./views/changepassword.vue";
export default {
  name: "YingApp",
  router,
  store,
  props: {
    config: {
      type: Function,
      default: context => {
        console.log(this);
      }
    }
  },
  mounted() {},
  created() {
    this.init();
  },
  methods: {
    init() {
      this.config(this);

      this.addRoute("/changepassword",changepassword,null,true);
      this.config_menu(
        "userinfo",
        [
          {
            name: "change_password",
            title: "修改密码",
            icon: "el-icon-eleme",
            action: () => {
              this.push("/changepassword");
            }
          },
          {
            name: "logout",
            title: "退出登录",
            icon: "el-icon-eleme",
            action: () => {
              store.commit("logout");
              this.push("/login");
            }
          }
        ]
      );
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
    addRoute(path, component, childs, requireAuth) {
      store.commit("addRoute", {
        path: path,
        name: path.replace("/", "_"),
        component: component,
        children: childs,
        meta: {
          requireAuth
        }
      });
    },
    config_menu(key, menus, template) {
      store.commit("menu", {
        key,
        menus,
        template
      });
    },
    push(location) {
      this.$router.push(location);
    }
  }
};
</script>
