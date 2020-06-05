import Vue from 'vue';
import Vuex from 'vuex';
import http from '../http';
Vue.use(Vuex);

let find_menu = (menus, key) => {
	for (let index = 0; index < menus.length; index++) {
		const element = menus[index];
		if (element.name == key) {
			return element;
		}
	}
}

let make_menu = (menus, mode) => {
	mode = mode || "horizontal";
	var template = menus.map((item) => {
		if (item.childs) {
			var child_template = make_menu(item.childs);
			return `<el-submenu index="${item.name}"><template slot="title"><i class="${item.icon}"></i><span>${item.title}</span></template> ${child_template}</el-submenu>`;
		} else {
			return `<el-menu-item index="${item.name}"> <i class="${item.icon}"></i><span>${item.title}</span></el-menu-item>`;
		}
	}).join("");
	return template;
};

const state = {
	user: {
		authenticated: !(!window.localStorage.getItem('token')),
		token: window.localStorage.getItem('token'),
		info: {
			username: '',
			nickname: ''
		}
	},
	app: {
		client_id: 'manager',
		client_secret: '123456',
		menus: {
			'main': [],
			'slide': [],
			'tools': [],
			'userinfo': []
		},
		routes: [],
		slide: false
	}
};

const getters = {
	username(state) {

		var userinfo = window.localStorage.getItem('userinfo') || '{}';
		userinfo =JSON.parse(userinfo);
		return state.user.authenticated ? userinfo.nickname : '未登录';
	},
	main_menus(state) {
		var menus = state.app.menus.main;
		var template = make_menu(menus);
		template = `<el-menu @select="handleSelect" mode="horizontal">${template}</el-menu>`;
		return { template, methods: { handleSelect(index, indexPath) { this.$store.commit('tiggerMenu', { key: "main", index, indexPath }) } } };
	},
	slide_menus(state) {
		var menus = state.app.menus.slide;
		var template = make_menu(menus);
		template = `<el-menu @select="handleSelect" mode="vertical" :collapse="$store.getters.slide" :collapse-transition="false" background-color="#20222A" text-color="#fff" active-text-color="#ffd04b">${template}</el-menu>`;
		return { template, methods: { handleSelect(index, indexPath) { this.$store.commit('tiggerMenu', { key: "slide", index, indexPath }) } } };
	},
	tools_menus(state) {
		var menus = state.app.menus.tools;
		var template = make_menu(menus);

		var userinfo = make_menu(state.app.menus.userinfo);
		template = `<el-menu @select="handleSelect" mode="horizontal">${template}<el-submenu index="userinfo"><div slot="title">{{$store.getters.username}}</div>${userinfo}</el-submenu></el-menu>`;
		return {
			template, methods: {
				handleSelect(index, indexPath) {
					if (indexPath[0] && indexPath[0] == "userinfo") {
						this.$store.commit('tiggerMenu', { key: "userinfo", index, indexPath })
					}
					else {
						this.$store.commit('tiggerMenu', { key: "tools", index, indexPath })
					}
				}
			}
		};
	},
	routes(state) {
		return state.app.routes;
	},
	slide(state) {
		return state.app.slide;
	},
	client(state) {
		return {
			client_id: state.app.client_id,
			client_secret: state.app.client_secret
		}
	}

};

const mutations = {
	menu(state, menu) {
		var k = menu.key;
		state.app.menus[k] = menu.menus;
	},
	tiggerMenu(state, options) {
		var menu = find_menu(state.app.menus[options.key], options.index);
		if (menu && menu.action && typeof menu.action == 'function') {
			menu.action(menu);
		}
	},
	toggleSide(state, show) {
		if (show != undefined) {
			state.app.slide = show;
		}
		else {
			state.app.slide = !state.app.slide;
		}
	},
	addRoute(state, route) {
		state.app.routes.push({ ...route });
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
		window.localStorage.setItem('userinfo', JSON.stringify(info));
	},
	login(state, user) {
		return (state.count += 1);
	},
	logout(state, user) {
		state.token = '';
		window.localStorage.setItem('token', '');
		state.user.authenticated = false;
		state.user.info = {};
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
				client_id: state.app.client_id,
				client_secret: state.app.client_secret,
				grant_type: 'password',
				username: username,
				password: password
			})
			.then((response) => {
				context.commit('setToken', response.access_token);
				return context.dispatch('getUserInfo', response.access_token);
			});
	},
	async changepassword(context, user) {
		const {  password ,new_password} = user;
		return http
			.post('api/user/account/change-password', {
				password: password,
				new_password: new_password
			});
	}
};

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});
