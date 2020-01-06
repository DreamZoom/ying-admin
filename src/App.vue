<template>
  <ying-app :config="config">
  </ying-app>
</template>

<script>
import table from "@/views/table";
import layout from "@/views/layout";
export default {
  name: "App",
  methods: {
    config(context) {
      context.route({
        path:"/user",
        component:table
      });

      context.menu("main", [
        {
          name: "file",
          title: "文件",
          icon: "el-icon-eleme",
          action: () => {
            console.log("文件");
          }
        },
        {
          name: "edit",
          title: "编辑",
          icon: "el-icon-eleme",
          action: () => {
            console.log("编辑");
          }
        },
        {
          name: "view",
          title: "视图",
          icon: "el-icon-eleme",
          action: () => {
            console.log("视图");
          }
        }
      ]);

      context.menu("slide", [
        {
          name: "wjxt",
          title: "问卷系统",
          icon: "el-icon-eleme",
          action: () => {
            context.push("/user");
          }
        }
      ]);
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
