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
export default {
    state: {
        menus: [],
        title:"Ying Admin Console",
        logo:logo,
        user:{
            name:"Wxllzf",
            avatar:""
        }
    },
    getters: {
        menus(state) {
            const template = make_menus(state.menus);
            console.log(template);
            return {
                template: `<a-menu mode="inline" theme="dark" @click="onClick" v-model="current">${template}</a-menu>`,
                data(){
                    return {
                        current: ["/"],
                    }
                },
                mounted(){
                    this.current = [this.$route.path];
                    console.log(this.current);
                },
                methods:{
                    onClick({ item, key, keyPath }){ 
                        console.log(key); 
                        this.$router.push({
                            path:key
                        });
                    }
                }
            };
        }
    },
    mutations:{
        setMenus(state, menus){
            state.menus = menus;
        }
    }
}