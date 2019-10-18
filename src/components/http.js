import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config => {
	// Do something before request is sent
	const token= window.localStorage.getItem("token");
	
	if (token) {
		console.log("token="+token)
	  // 让每个请求携带token-- ['Authorization']
	  config.headers['Authorization'] = 'Bearer '+token;
	  // 处理刷新token后重新请求的自定义变量
	  config['refresh_token'] = false
	}
	return config
  }, error => {
	Promise.reject(error)
  })
axios.interceptors.response.use(
	(response) => {
		//成功请求到数据
		return Promise.resolve(response.data);
	},
	(error) => {
		//响应错误处理
		return Promise.reject(error);
	}
);

export default {
	get(url, data) {
		return axios.get(url, {
			paramsSerializer: function(params) {
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
