import Vue from 'vue';
import Vuex from 'vuex';
import http from '../http';
Vue.use(Vuex);

const findMenu = (menus, name) => {
	for (var i = 0; i < menus.length; i++) {
		var menu = menus[i];
		if (menu == null) continue;
		if (menu.name == name) {
			return menu;
		}
		if(menu.childs){
			var cmenu = findMenu(menu.childs, name);
			if (cmenu != null) return cmenu;
		}	
	}
	return null;
};
let combMenu = (menus,mode) => {
	mode=mode||"horizontal";
	var template = menus.map((item) => {
		if (item.childs) {
			var child_template = combMenu(item.childs);
			return `<el-submenu index="${item.name}"><template slot="title"><i class="${item.icon}"></i><span>${item.title}</span></template> ${child_template}</el-submenu>`;
		} else {
			return `<el-menu-item index="${item.name}"> <i class="${item.icon}"></i><span>${item.title}</span></el-menu-item>`;
		}
	}).join("");
	return template;
};

const state = {
	count: 1,
	client_id: '',
	client_secret: '',

	user: {
		authenticated: false,
		token: window.localStorage.getItem('token'),
		info: {
			username: '',
			nickname: ''
		}
	},
	app: {
		menus: [
			{
				name: 'main',
				childs: []
			},
			{
				name: 'slide',
				childs: []
			},
			{
				name: 'tools',
				childs: []
			}
		],
		routes:[],
		hideSide:false
	}
};

const getters = {
	username(state) {
		return state.user.authenticated ? state.user.info.nickname : '未登录';
	},
	main_menus(state) {
		var menus = findMenu(state.app.menus, 'main').childs;
		var template = combMenu(menus);
		template = `<el-menu @select="handleSelect" mode="horizontal">${template}</el-menu>`;
		return { template,methods:{handleSelect(index,indexPath){this.$store.commit('tiggerMenu',{index,indexPath})}} };
	},
	slide_menus(state) {
		var menus = findMenu(state.app.menus, 'slide').childs;
		var template = combMenu(menus);
		template = `<el-menu @select="handleSelect" mode="vertical" :collapse="$store.getters.side" :collapse-transition="false" background-color="#20222A" text-color="#fff" active-text-color="#ffd04b">${template}</el-menu>`;
		return { template ,methods:{handleSelect(index,indexPath){this.$store.commit('tiggerMenu',{index,indexPath})}}};
	},
	tools_menus(state) {
		var menus = findMenu(state.app.menus, 'tools').childs;
		var template = combMenu(menus);
		template = `<el-menu @select="handleSelect" mode="horizontal">${template}<el-submenu index="2"><div slot="title">{{$store.getters.username}}</div><el-menu-item index="2-1">修改密码</el-menu-item><el-menu-item index="2-2">注销登录</el-menu-item></el-submenu></el-menu>`;
		return { template,methods:{handleSelect(index,indexPath){this.$store.commit('tiggerMenu',{index,indexPath})}} };
	},
	routes(state){
		return state.app.routes;
	},
	side(state){
		console.log(state.app.hideSide);
		return state.app.hideSide;
	}
};

const mutations = {
	addMenu(state, menu) {
		const parent = menu.parent;
		console.log(parent);
		var p = findMenu(state.app.menus, parent);
		if (p) {
			if (!p.childs) {
				console.warn(`${parent} has not childs attribute,must set it`);
				p.childs = [];
			}
			p.childs.push({ ...menu });
		}
	},
	tiggerMenu(state,menu){
		console.log(menu);
		var p = findMenu(state.app.menus, menu.index);
		if(p && p.action){
			p.action(p);
		}
	},
	toggleSide(state,show){
		
		if(show!=undefined){
			state.app.hideSide = show;
		}
		else{
			state.app.hideSide=!state.app.hideSide;
		}
		
	},
	addRoute(state, route){
		state.app.routes.push({...route});
	},
	setClient(state, client_id, client_secret) {
		state.client_id = client_id;
		state.client_secret = client_secret;
	},
	setToken(state, token) {
		state.token = token;
		window.localStorage.setItem('token', token);
	},
	clearToken(state) {
		state.token = '';
		window.localStorage.setItem('token', '');
	},
	setUserInfo(state, info) {
		state.user.authenticated = true;
		state.user.info = info; // 获取到用户信息的同时将authenticated标记为true
	},
	login(state, user) {
		return (state.count += 1);
	},
	logout(state, user) {
		return (state.count -= 1);
	}
};

const actions = {
	async getUserInfo(context, token) {
		return http.post('api/oauth/user').then((user) => {
			context.commit('setUserInfo', user);
			return Promise.resolve(user);
		});
	},
	async login(context, user) {
		const { username, password } = user;
		return http
			.post('api/oauth/token', {
				client_id: 'v_blog_2019',
				client_secret: '123456',
				grant_type: 'password',
				username: username,
				password: password
			})
			.then((response) => {
				context.commit('setToken', response.access_token);
				return context.dispatch('getUserInfo', response.access_token);
			});
	}
};

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});
