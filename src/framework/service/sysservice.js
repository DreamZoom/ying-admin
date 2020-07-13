import request from "../utils/request";
export default class {
    login(user) {
        const { username, password, client_id, client_secret, grant_type } = user;
        return request
            .post('api/oauth/token', {
                client_id, client_secret, grant_type,
                username: username,
                password: password
            });
    }

    changepassword(user) {
        const { username, password, newpassword } = user;
        return request
            .post('api/user/account/change-password', {
                username,
                password: password,
                new_password: newpassword
            });
    }



    fetchUser(token) {
        return request.post('api/oauth/user');
    }

    logout() {
        return Promise.resolve();
    }
}