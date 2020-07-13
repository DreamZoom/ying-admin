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
import logo from "../../assets/logo.svg"
import request from "../utils/request";

const theme = window.localStorage.getItem("theme");
export default {
    state: {
        theme: theme||"dark",
        menus: [],
        messages: [{title:"系统通知",content:"页面已删除",time:""}],
        title: "Ying Admin Console",
        logo: logo,
        user: null,
        token: null
    },
    getters: {
        menus(state) {
            const template = make_menus(state.menus);
            console.log(template);
            return {
                template: `<a-menu mode="inline" :theme="$store.getters.theme" @click="onClick" :selectedKeys="current">${template}</a-menu>`,
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
        },
        login(state) {
            const isLogin = state.user && state.user.username;
            if (isLogin) return true;

            const userinfo = window.localStorage.getItem('userinfo');
            if (userinfo) {
                const user = JSON.parse(userinfo);
                state.user = { ...user };
                return user && user.username;
            }
            return null;
        },
        authority(state) {
            if (state.user && state.user.authority instanceof Array) {
                return state.user.authority;
            }
            if (state.user && state.user.roles && typeof state.user.roles ==="string") {
                return state.user.roles.split(",");
            }
            return [];
        },
        messages(state){
            if(state.messages && state.messages instanceof Array && state.messages.length){
                return state.messages;
            }
            else{
               var messages = JSON.parse(window.localStorage.getItem("messages")||"[]");
            }
        },
        theme(state){
            return state.theme;
        }
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
            window.localStorage.setItem('theme', theme);
        },
        setMenus(state, menus) {
            state.menus = menus;
        },
        setUserInfo(state, info) {
            state.user = { ...info };
            window.localStorage.setItem('userinfo', JSON.stringify(info));
        },
        setToken(state, token) {
            state.token = { ...token };
            window.localStorage.setItem("token", JSON.stringify(token));
        },
        logout(state) {
            state.user = {};
            window.localStorage.removeItem("userinfo");
            window.localStorage.removeItem("token");
        },
        pushMessage(state, message) {
            const { title, content, time } = message;
            state.messages.push({
                title, content, time
            });
            window.localStorage.setItem("messages",JSON.stringify(state.messages));
        },
        removeMessage(state, message){
            state.messages.splice(state.messages.indexOf(message),1);
            state.messages= [].concat(state.messages);
            window.localStorage.setItem("messages",JSON.stringify(state.messages));
        }
    },
    actions: {
        
    }
}