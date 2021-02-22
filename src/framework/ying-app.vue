<template>
  <a-config-provider :locale="locale">
    <component :is="app"></component>
  </a-config-provider>
</template>
<script>
import router from "./router/index";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
function build_menus(parent, parentPath) {
  var menus = [];
  if (!(parent.children && parent.children instanceof Array)) return menus;
  parent.children.map((item) => {
    let { path, name, icon, children,meta } = item;
    if (name) {
      const arrPath = parentPath.concat([path]);
      const childs = build_menus(item, arrPath);
      path = arrPath.join("/").replace("//", "/");
      menus.push({
        path,
        name,
        icon,
        childs,
        meta
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
      locale: zhCN,
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