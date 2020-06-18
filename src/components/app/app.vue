<template>
   <router-view />
</template>
<script>
import Router from "vue-router";
import store from "./store";
import router from "./router";
import master from "./views/master.vue";
import changepassword from "./views/changepassword.vue";
export default {
  name: "YingApp",
  store,
  router,
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
      innerView:{template:"<router-view />"},
      masters: {},
      routes: []
    };
  },
  methods: {
    init() {
      this.config(this);

      this.route("/changepassword",changepassword,null,true);
      this.menu(
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
    route(path, component, childs, requireAuth) {
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
    menu(key, menus, template) {
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
