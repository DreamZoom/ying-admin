<template>
  <component :is="app"></component>
</template>
<script>
import router from "./router/index";

function build_menus(parent, parentPath) {
  var menus = [];
  if (!(parent.children && parent.children instanceof Array)) return menus;
  parent.children.map((item) => {
    let { path, name, icon, children } = item;
    if (name) {
      const arrPath = parentPath.concat([path]);
      const childs = build_menus(item, arrPath);
      path = arrPath.join("/").replace("//", "/");
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
    app() {
      return {
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
        const routes = config.routes || [];
        router.addRoutes(routes);
        const menus = routes
          .map((item) => build_menus(item, [item.path]))
          .reduce((a, b) => a.concat(b));
        this.$app.commit("setConfig", { ...config, menus });
        this.$app.commit("setMenus", menus);
      });
    },
  },
};
</script>

<style>
</style>