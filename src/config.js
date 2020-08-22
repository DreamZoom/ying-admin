import home from "./views/home"
import channel from "./views/channel"
import channelEdit from "./views/channel-edit"
import logo from "./assets/logo.png"
import login_view from "./framework/views/login";

import YingAdmin from "./framework/index"


export default {
    title: "Ying Admin",
    logo: logo,
    login: "/login",
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
                }
            ]
        },
        {
            path: "/login",
            component:login_view
        }
    ]
}