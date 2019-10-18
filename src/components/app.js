import Vue from 'vue';

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

import http from './http';
import router from './app/router';
import store from './app/store';

import master from './app/views/master.vue';
import empty from './app/views/empty.vue';
import app from './app/views/app.vue';

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

	

    addMenu(parent, name, title, icon,action) {
        store.commit("addMenu", {
            parent,
            name,
            title,
            icon,
            action
        })
    }
    addRoutes(routes){
        router.addRoutes(routes);
    }
    
    addRoute(path,component,childs){
        router.addRoutes([{
            path: path,
			name: path.replace("/","_"),
            component: component,
            children:childs
        }]);
    }

    nav(path){
        router.push(path);
    }

	run(configFunc) {

        if(typeof configFunc=="function"){
            configFunc.call(this,this);
        }

        router.addRoutes([{
            path: '/',
			name: 'main',
            component: master,
        }]);

		this.instance = new Vue({
			el: this.appId,
			store,
            router,
            components: { app },
			template: '<app />'
		});
		return this.instance;
	}
}
