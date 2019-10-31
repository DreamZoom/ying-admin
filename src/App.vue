<template>
  <ying-app :config="config">
  </ying-app>
</template>

<script>
  import table from '@/views/table';
  import layout from '@/views/layout';
  export default {
    name: 'App',
    methods: {
      config(context) {

        context.addRoute("user",table);
       
        
        context.addMenu('main', 'file', '文件', 'el-icon-eleme');
        context.addMenu('main', 'edit', '编辑', 'el-icon-eleme');
        context.addMenu('main', 'view', '视图', 'el-icon-eleme');
        context.addMenu('tools', 'message', '消息', 'el-icon-eleme');
        context.addMenu('slide', 'wjxt', '问卷系统', 'el-icon-eleme');
        context.addMenu('wjxt', 'wjgl', '问卷管理', 'el-icon-eleme');
        context.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme',()=>{
          context.push("/user")
        });
    
      }
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
