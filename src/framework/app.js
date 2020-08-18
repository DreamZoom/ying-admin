import default_logo from "../assets/logo.svg"


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

class App {
    constructor() {

    }

    isLogin() {

        return this.getUser().username

    }

    setUser(user) {
        this.user = { ...user }
    }

    getUser() {
        return { ...this.user }
    }

    getAuthorities() {
        return this.getUser().authorities
    }

    haveAuthority(authority) {
        let intersection = store.getters.authority.filter(function (val) {
            return authority == val;
        });
        return intersection.length > 0;
    }

    getTheme() {
        return localStorage.getItem("theme") || "dark";
    }

    setTheme(theme) {
        localStorage.setItem("theme", theme || "dark")
    }

    getTitle() {
        return localStorage.getItem("title") || "通用管理中台";
    }

    setTitle(title) {
        localStorage.setItem("title", title || "通用管理中台");
    }

    getLogo() {
        return localStorage.getItem("logo") || default_logo;
    }

    setLogo(logo) {
        localStorage.setItem("logo", logo || default_logo);
    }

    setConfig(config) {
        this.config = { ...config };
    }

    getConfig() {
        return this.config || {}
    }

    getMenus() {
        const config = this.getConfig();
        const template = make_menus(config.menus || []);
        return {
            template: `<a-menu mode="inline" :theme="$app.getTheme()" @click="onClick" :selectedKeys="current">${template}</a-menu>`,
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
}

export default new App();