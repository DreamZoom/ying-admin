import Vue from 'vue';

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

import http from './http';
import router from './app/router';
import store from './app/store';

import master from './app/views/master.vue';
import empty from './app/views/empty.vue';

Vue.use(ElementUI, {
	size: 'small'
});

Vue.prototype.$http = http;

export default class App {
	appId = '';
	instance = null;
    routes = [];
    menus = [];
    options={};

	constructor(appId) {
		this.appId = appId;
	}

	config(options) {
		this.options={
            ...options
        };
	}

	
    

    buildRoute(menus,paths){
        menus =menus||[];
        console.log(menus);
        
        const routes = menus.map((item)=>{
            let i_path= paths.slice()
            i_path.push(item.name);
            item.path="/"+i_path.join("/");
            var r = {
                path:item.name,
                name: i_path.join("_"),
                component: item.component,
                meta: {
                    requireAuth: item.auth 
                }
            };
            if(item.childs){
                r.children = this.buildRoute(item.childs,i_path);
                r.component =empty;
            }
            return  r;
        });

        return routes;
    }

	run() {

        var menus=this.options.menus||[];

        store.commit('setMenus', menus);
        const routes = this.buildRoute(menus,[]);
        console.log(routes);

        router.addRoutes([{
            path: '/',
			name: 'main',
            component: master,
            children:routes
        }]);

		this.instance = new Vue({
			el: this.appId,
			store,
			router,
			template: '<router-view />'
		});
		return this.instance;
	}
}
