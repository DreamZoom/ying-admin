import Vue from 'vue';
import Vuex from 'vuex';
import http from '../http';
Vue.use(Vuex);

const state = {
	count: 1,
	client_id:"",
	client_secret:"",
	menus:[],
	user: {
		authenticated: false,
		token: window.localStorage.getItem('token'),
		info: {
			username: '',
			nickname: ''
		}
	},
	app:{
		main_menus:[],
		left_menus:[],
		tools:[]
	}
};

const getters = {
	username(state) {
		return state.user.authenticated ? state.user.info.nickname : '未登录';
	}
};

const mutations = {
	setMenus(state,menus){
		state.menus=menus;
	},
	setClient(state,client_id,client_secret){
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
        return http.post("api/oauth/user").then((user)=>{
            context.commit('setUserInfo', user);
            return Promise.resolve(user);
        })	
    },
	async login(context, user) {
        const {username,password} = user;
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
                return context.dispatch("getUserInfo",response.access_token);
			});
	}
};

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});
