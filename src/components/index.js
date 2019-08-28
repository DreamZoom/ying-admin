import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from "./http";
import DataSource from "./table/data-source"

import table from "./table/table.vue"
import tableAction from "./table/table-action.vue"
import tableColumn from "./table/table-column.vue"
import tableActions from "./table/table-actions.vue"

const components = {
    table,
    tableColumn,
    tableActions,
    tableAction
};

console.log(components)

const install = function(Vue, opts = {}) {
	//locale.use(opts.locale);
    //locale.i18n(opts.i18n);
    
    Vue.use(ElementUI,{
        size:"small"
    });

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
