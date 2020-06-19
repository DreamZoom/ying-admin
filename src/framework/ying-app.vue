<template>
  <component :is="app"></component>
</template>
<script>
import Vuex from "vuex";
import VueRouter from "vue-router";
import Mainlayout from "./layout/main";
import app_store from "./store/app";
import utils from "./utils";
export default {
  name: "YingApp",
  props: {
    config: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    app() {
      const router = new VueRouter({
        routes: this.routes
      });
      const store = new Vuex.Store({ ...this.stores });
      return {
        router,
        store,
        template: "<router-view></router-view>"
      };
    }
  },
  data() {
    return {
      routes: [],
      stores: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //get routes and build menus
      this.config().then(config => {
        const childs = config.routes || [];
        const routes = [
          {
            path: "/",
            component: Mainlayout,
            children: childs
          }
        ];
        this.routes = routes;
        const menus = this.buildMenus(childs);
        this.stores = utils.extend(app_store, {
          state: {
            menus,
            title: config.title,
            logo: config.logo
          }
        },config.store);
      });
    },
    buildMenus(routes) {
      function make(routes, parent) {
        var menus = [];
        routes.map(item => {
          let { path, name, icon, children } = item;
          if (name) {
            var childs = [];
            if (children && children instanceof Array) {
              childs = make(children, item);
            }
            const index = path.substr(0, 1);
            if (index != "/") {
              path = "/" + path;
              if (parent && parent.path) {
                path = parent.path + path;
              }
            }
            menus.push({
              path,
              name,
              icon,
              childs
            });
          }
        });
        return menus;
      }

      return make(routes, { path: "/" });
    }
  }
};
</script>

<style>
</style>