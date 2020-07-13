import app_store from "../store/app";
import SysServices from "../service/sysservice";
export default function (newstate,services) {
    let sysservice = new SysServices();
    sysservice= {
        ...sysservice,
        ...services
    }
    const { state, getters, mutations, actions, modules } = app_store;
    return {
        state: {
            ...state,
            ...newstate
        },
        getters: {
            ...getters,
        },
        mutations: {
            ...mutations
        },
        actions: {
            ...actions,
            async getUserInfo(context, token) {
                return sysservice.fetchUser(token).then((response) => {
                    context.commit('setUserInfo', response.data);
                    return Promise.resolve(response.data);
                });
            },
            async login(context, user) {
                return sysservice.login(user)
                    .then((response) => {
                        const token = response.data;
                        console.log(token);
                        if (token.access_token) {
                            context.commit('setToken', token);
                            return context.dispatch('getUserInfo', token.access_token);
                        }
                        else {
                            return Promise.reject(token);
                        }
                    });
            },
            async changepassword(context, user) {
                return sysservice.changepassword(user);
            },
            async logout(context) {
                return sysservice.logout().then(()=>{
                    context.commit('logout');
                    return Promise.resolve();
                });
            }
        },
        modules: {
            ...modules
        }
    }

}