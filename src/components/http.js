import axios from 'axios';
import qs from 'qs';
import router from './app/router';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config => {
	// Do something before request is sent
	const token = window.localStorage.getItem("token");

	if (token) {
		console.log("token=" + token)
		// 让每个请求携带token-- ['Authorization']
		config.headers['Authorization'] = 'Bearer ' + token;
		// 处理刷新token后重新请求的自定义变量
		//   config['refresh_token'] = false
	}
	return config
}, error => {
	Promise.reject(error)
})
axios.interceptors.response.use(
	(response) => {
		return Promise.resolve(response.data);
	},
	(error) => {
		const { request, response } = error;

		if (response.status == 401) {
			router.push("/login");
		}
		else if(response.status == 403){
			alert("无权限");
			return Promise.resolve({result:false,message:"无权限"});
		}
		else{
			return Promise.reject(response.data);
		}
	}
);

export default {
	get(url, data) {
		return axios.get(url, {
			paramsSerializer: function (params) {
				return qs.stringify(params, { arrayFormat: 'repeat' });
			},
			params: {
				...data
			}
		});
	},
	post(url, data) {
		// return axios.post(url, qs.stringify({...options}));
		return axios({
			method: 'post',
			url: url,
			data: qs.stringify(
				{
					...data
				},
				{ arrayFormat: 'repeat' }
			)
		});
	}
};
