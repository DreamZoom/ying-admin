import Vuex from "vuex";
import Vue from 'vue';
import default_logo from "../../assets/logo.svg"

Vue.use(Vuex);

function make_menus(menus) {
    return menus.map((item) => {
        if (item.childs && item.childs instanceof Array && item.childs.length > 0) {
            const template = make_menus(item.childs);
            return `<a-sub-menu key="${item.path}" group="true"><span slot="title"><a-icon type="${item.icon}" /><span>${item.name}</span></span>${template}</a-sub-menu>`;
        }
        else {
            return `<a-menu-item key="${item.path}"><span><a-icon type="${item.icon}" /><span>${item.name}</span></span></a-menu-item>`;
        }
    }).join("");
}

const userstring = localStorage.getItem("user");
const tokenstring = localStorage.getItem("token");

let user = {};
if (userstring) {
    user = JSON.parse(userstring);
}

let token = {};
if (tokenstring) {
    token = JSON.parse(tokenstring);
}


const store = new Vuex.Store({
    state: {
        theme: "dark",
        title: "通用管理中控台",
        logo: default_logo,
        menus: [],
        user: { ...user },
        token: { ...token },
        login: "/login",
        client: {
            client_id: "app_123456",
            client_secret: "client_secret"
        }
    },
    getters: {
        theme(state) {
            return state.theme || "dark";
        },
        title(state) {
            return state.title || "通用管理中控台";
        },
        logo(state) {
            return state.logo || default_logo;
        },
        login(state) {
            return state.login;
        },
        client(state) {
            return state.client;
        },
        user(state) {
            return state.user || {};
        },
        token(state) {
            return state.token || {};
        },
        authorized(state) {
            return state.user && state.user.username;
        },
        authorities(state) {
            if (store.getters.authorized) {
                if (state.user.roles && typeof state.user.roles == "string" && state.user.roles != "") {
                    return state.user.roles.split(",")
                }
                return state.user.authorities || []
            }
            return [];
        },
        accessVoter(state) {
            return function (access) {
                access = access || [];
                let intersection = store.getters.authorities.filter(function (val) {
                    return access.indexOf(val) > -1;
                });
                return intersection.length > 0;
            }
        },
        menus(state) {
            const template = make_menus(state.menus || []);
            return {
                template: `<a-menu mode="inline" :theme="$app.getters.theme" @click="onClick" :selectedKeys="current">${template}</a-menu>`,
                data() {
                    return {
                        current: ["/"],
                    }
                },
                watch: {
                    '$route': function (route) {
                        console.log(route);
                        this.current = [route.path];
                    }
                },
                mounted() {
                    this.current = [this.$route.path];
                },
                methods: {
                    onClick({ item, key, keyPath }) {
                        this.$router.push({
                            path: key
                        });
                    }
                }
            };

        }
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
            window.localStorage.setItem('theme', theme);
        },
        setTitle(state, title) {
            state.title = title;
        },
        setLogo(state, logo) {
            state.logo = logo;
        },
        setMenus(state, menus) {
            state.menus = menus;
        },
        setUser(state, info) {
            state.user = { ...info };
            window.localStorage.setItem('user', JSON.stringify(info));
        },
        setToken(state, token) {
            state.token = { ...token };
            window.localStorage.setItem("token", JSON.stringify(token));
        },
        setConfig(state, config) {
            const { logo, title, theme, login, client } = config;
            state.title = title || state.title;
            state.logo = logo || state.logo;
            state.theme = theme || state.theme;
            state.login = login || state.login;
            state.client = client || state.client;
        }
    },
    actions: {
        request(context) {

        }
    }
});


export default store;