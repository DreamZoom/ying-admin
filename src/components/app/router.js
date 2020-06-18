import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import login from './views/login.vue';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: login
		}
	]
});


router.beforeEach(async (to, from, next) => {
	//const store = router.app.$store;
	console.log(to);
	if (to.matched.some((record) => record.meta.requireAuth)) {
		// 检查是否需要登录权限
		if (!store.state.user.authenticated) {
			// 检查是否已登录
			if (store.state.user.token) {
				// 未登录，但是有token，获取用户信息
				try {
					const data = await store.dispatch('getUserInfo', store.state.token);
					if (data) {
						next();
					} else {
						window.alert('请登录');
						store.commit('clearToken');
						next({ name: 'login' });
					}
				} catch (err) {
					window.alert('请登录');
					store.commit('clearToken');
					next({ name: 'login' });
				}
			} else {
				window.alert('请登录');
				next({ name: 'login' });
			}
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
