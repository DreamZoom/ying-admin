<template>
  <component :is="layout"></component>
</template>
<script>
import Vuex from "vuex";
import VueRouter from "vue-router";
import { message } from "ant-design-vue";
import makestore from "./store/makestore";

import login_view from "./views/login";
import change_password from "./views/changepassword";
import layout_view from "./layout/main";

import router from "./router/index";
export default {
  name: "YingApp",
  router,
  props: {
    config: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    layout() {
      console.log(this.$route);
      const meta = this.$route.meta || {};
      const me_layout_view = meta.layout || layout_view;
      return me_layout_view;
    },
    app() {
      const store = new Vuex.Store({ ...this.stores });
      // const router = new VueRouter({
      //   routes: this.routes
      // });

      return {
        store,
        template: "<router-view></router-view>",
      };
    },
  },
  data() {
    return {
      routes: [],
      stores: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //get routes and build menus
      this.config().then((config) => {
        const childs = config.routes || [];
        const routes = [
          {
            path: "/",
            component: layout_view,
            children: [
              {
                path: "/changepassword",
                component: change_password,
              },
            ].concat(childs),
          },
        ];
        this.routes = routes;
        router.addRoutes(this.routes);
        const menus = this.buildMenus(childs);
        // this.stores = makestore(
        //   {
        //     menus,
        //     title: config.title,
        //     logo: config.logo,
        //   },
        //   config.sysservices
        // );
        this.$app.setConfig({ ...config, menus });
      });
    },
    buildMenus(routes) {
      function make(routes, parent) {
        var menus = [];
        routes.map((item) => {
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
              childs,
            });
          }
        });
        return menus;
      }

      return make(routes, { path: "/" });
    },
  },
};
</script>

<style>
</style>