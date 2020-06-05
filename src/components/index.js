

import http from "./http";
import DataSource from "./table/data-source"

import table from "./table/table.vue"
import tableColumn from "./table/table-column.vue"

import select from "./input/select.vue"
import chose from "./input/chose.vue"
import upload from "./input/upload.vue"
import richEditor from "./input/rich-editor.vue"



import app from "./app/app";

const components = {
    table,
    tableColumn,
    select,
    chose,
    upload,
    app,
    richEditor
};

console.log(components)

const install = function(Vue, opts = {}) {
    Object.keys(components).forEach((key)=>{
         const component =components[key];
         Vue.component(component.name, component);
    })

    Vue.prototype.$http=opts.http || http;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.0.0.1',
    install,
    DataSource
};
