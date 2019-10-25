// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import yingUI from './components/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.config.productionTip = false;
Vue.use(ElementUI, {
	size: 'small'
});
Vue.use(yingUI);
// const app = new yingUI.app('#app');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />'
})

// app.run(function(context) {
//   console.log(this);
// 	this.addMenu('main', 'toggle-slide', '切换菜单', 'el-icon-s-fold', (menu) => {
// 		console.log('切换菜单');
//     console.log(menu);
//     this.nav("/user")
// 	});
// 	this.addMenu('main', 'file', '文件', 'el-icon-eleme');
// 	this.addMenu('main', 'edit', '编辑', 'el-icon-eleme');
// 	this.addMenu('main', 'view', '视图', 'el-icon-eleme');
// 	this.addMenu('tools', 'message', '消息', 'el-icon-eleme');

// 	this.addMenu('slide', 'wjxt', '问卷系统', 'el-icon-eleme');
// 	this.addMenu('wjxt', 'wjgl', '问卷管理', 'el-icon-eleme');
// 	this.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme');
// 	this.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme');
// 	this.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme');
// 	this.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme');
// 	this.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme');
// 	this.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme');
//   this.addMenu('slide', 'wjxt1', '问卷系统', 'el-icon-eleme');
  
//   this.addRoute("/user",table)
// });
