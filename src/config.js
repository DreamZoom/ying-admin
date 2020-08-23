import home from "./views/home"
import channel from "./views/channel"
import channelEdit from "./views/channel-edit"
import logo from "./assets/logo.png"
import posts from "./views/posts"

import YingAdmin from "./framework/index"


export default {
    title: "Ying Admin",
    logo: logo,
    login: "/login",
    client: {
        client_id: "app_123456",
        client_secret: "client_secret"
    },
    routes: [
        {
            path: "/",
            component: YingAdmin.YingLayout,
            children: [
                {
                    path: "",
                    name: "首页",
                    icon: "home",
                    component: home,
                    meta: {
                        authority: ['admin'],
                    }

                },
                {
                    path: "channel",
                    name: "栏目管理",
                    icon: "bell",
                    component: channel,
                    children: [{
                        path: "edit",
                        name: "栏目编辑",
                        icon: "bell",
                        component: channelEdit,
                    }]
                },
                ,
                {
                    path: "posts",
                    name: "文章管理",
                    icon: "bell",
                    component: posts
                }
            ]
        },
        {
            path: "/login",
            component: YingAdmin.YingLogin
        }
    ]
}