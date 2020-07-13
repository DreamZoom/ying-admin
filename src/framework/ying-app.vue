<template>
  <component :is="app"></component>
</template>
<script>
import Vuex from "vuex";
import VueRouter from "vue-router";
import {message} from "ant-design-vue";
import makestore from "./store/makestore"

import login_view from "./views/login";
import change_password from "./views/changepassword";
import layout_view from "./layout/main";
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
      const store = new Vuex.Store({ ...this.stores });
      const router = new VueRouter({
        routes: this.routes
      });

      router.beforeEach((to, from, next) => {
        console.log(to);
        if (
          to.meta &&
          to.meta.authority &&
          to.meta.authority instanceof Array &&
          to.meta.authority.length > 0
        ) {
          console.log(to.meta.authority);
          //判断是否登录
          if (!store.getters.login) {
            next({
              path: "/login"
            });
          } else {
            //求两个权限的交集
            console.log(store.getters.authority);
            let intersection = store.getters.authority.filter(function(val) {
              return to.meta.authority.indexOf(val) > -1;
            });
            if (intersection.length == 0) {
              //判断是否有权限
              // next(from);
              message.warning(`对不起，您没有权限访问 ${to.name}。`)
              next(false);
            } else {
              next();
            }
          }
        } else {
          next();
        }
      });

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
            path: "/login",
            component: login_view
          },
          {
            path: "/",
            component: layout_view,
            children: [{
              path:"/changepassword",
              component:change_password
            }].concat(childs) 
          }
        ];
        this.routes = routes;
        const menus = this.buildMenus(childs);
        this.stores = makestore({
            menus,
            title: config.title,
            logo: config.logo
        },config.sysservices);
        
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