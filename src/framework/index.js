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

const install = function (Vue, opts = { size: "large" }) {
    Vue.use(VueRouter);
    Vue.use(Vuex);
    Vue.use(antd, opts);

    Object.keys(components).forEach((key) => {
        const component = components[key];
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


function extend() {
    var extended = {};
    var deep = false;
    var i = 0;

    // 判断是否为深拷贝
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;//如果为深拷贝则初始的i为1或者为0
    }

    // 将对象属性合并到已存在的对象中
    var merge = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                // 如果属性为对象并且需要深拷贝时则使用函数递归、反之则将当前的属性替换现有的属性
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    // 遍历所有对象属性
    for (; i < arguments.length; i++) {
        merge(arguments[i]);
    }

    return extended;

}