import VueRouter from "vue-router";
const router = new VueRouter({
    routes: []
});

router.beforeEach((to, from, next) => {

    const app = router.app.$app;
    if (
        to.meta &&
        to.meta.authority &&
        to.meta.authority instanceof Array &&
        to.meta.authority.length > 0
    ) {
        console.log(to.meta.authority);
        //判断是否登录
        if (!app.getters.authorized) {
            next({
                path: app.getters.login
            });
        } else {
            //判断是否有权限
            if (app.getters.accessVoter.apply(app, [to.meta.authority])) {
                message.warning(`对不起，您没有权限访问 ${to.name}。`)
                next(false);
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

export default router;