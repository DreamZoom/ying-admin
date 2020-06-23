// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';


import YingUI from './framework/index';
const  {BaseService} = YingUI;

//  import mock from "./mock/index";
 require('./mock/index.js')

Vue.config.productionTip = false;
Vue.use(YingUI);

const service =new BaseService({controller:"news/channel"});
service.query({page:1,size:20}).then((response)=>{
  console.log(response)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App />'
})

