import Vue from 'vue';
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import YingApp from "./ying-app";

const components = {
    YingApp
};

console.log(components)

const install = function(Vue, opts = {size:"large" }) {

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
