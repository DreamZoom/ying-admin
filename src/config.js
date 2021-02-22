import logo from "./assets/logo.png"

import home from "./views/home"
import channel from "./views/channel"
import posts from "./views/posts"

import YingAdmin from "./framework/index"


export default {
    title: "Ying Admin",
    logo: logo,
    login: "/login",
    client: {
        client_id: "manager",
        client_secret: "123456"
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
                        // authority: ['gov'],
                    }

                },
                {
                    path: "channel",
                    name: "栏目管理",
                    icon: "bell",
                    component: channel,
                    meta: {
                        authority: ['gov-manage'],
                    }

                },
                ,
                {
                    path: "posts",
                    name: "文章管理",
                    icon: "bell",
                    component: posts,
                    // meta: {
                    //     authority: ['gov'],
                    // }
                }
            ]
        },
        {
            path: "/login",
            component: YingAdmin.YingLogin
        }
    ]
}