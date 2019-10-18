// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import yingUI from "./components/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import table from '@/views/table'
import layout from '@/views/layout'

Vue.config.productionTip = false
Vue.use(ElementUI,{
  size:"small"
});
Vue.use(yingUI);
const app = new yingUI.app("#app");

app.config({
    menus:[
      {
        name:"appls",
        icon:"el-icon-message",
        title:"应用管理",
        childs:[
          {
            name:"table",
            icon:"el-icon-message",
            title:"应用管理",
            component:table
          },
          {
            name:"list",
            icon:"el-icon-message",
            title:"应用管理2",
            component:table
          }
        ]
      }
    ]
})
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

app.run();