import Vue from 'vue';
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueRouter from 'vue-router'
import Vuex from 'vuex'


import YingApp from "./ying-app";
import PageWapper from "./components/page-wapper";


const components = {
    YingApp,
    PageWapper
};

console.log(components)

const install = function(Vue, opts = {size:"large" }) {
    Vue.use(VueRouter);
    Vue.use(Vuex);
    Vue.use(antd,opts);

    Object.keys(components).forEach((key)=>{
         const component =components[key];
         Vue.component(component.name, component);
    })

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.0.0.1',
    install
};
