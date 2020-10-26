import Vue from 'vue';
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueRouter from 'vue-router'
import Vuex from 'vuex'


import YingApp from "./ying-app";
import PageWapper from "./components/page-wapper";
import YingTable from "./components/table";
import YingSearchForm from "./components/search-form";
import YingSearchFormItem from "./components/search-form-item";
import YingTree from "./components/tree";
import YingPage from "./components/page";
import YingAction from "./components/action";

import YingTableSelect from "./components/table-select";
import YingTreeSelect from "./components/tree-select";
import YingEnumSelect from "./components/enum-select";

import app from "./store/index";
import request from "./utils/request";
import task from "./utils/task";
import BaseService from "./service/service";


import YingLayout from "./layout/main";
import YingEmpty from "./layout/main";

import YingLogin from "./views/login";


const components = {
    YingApp,
    PageWapper,
    YingTable,
    YingSearchForm,
    YingSearchFormItem,
    YingTree,
    YingPage,
    YingLayout,
    YingEmpty,
    YingLogin,
    YingAction,
    YingTableSelect,
    YingTreeSelect,
    YingEnumSelect
};


const install = function (Vue, opts = { size: "large" }) {
    Vue.use(VueRouter);

    Vue.use(antd, opts);

    Vue.prototype.$app = app;//注入app服务
    Vue.prototype.$request = request;
    Vue.prototype.$task = task;

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
    install,
    request,
    BaseService,
    ...components
};