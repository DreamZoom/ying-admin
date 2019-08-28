import axios from 'axios';
import qs from 'Qs';
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
	get(url, options) {
		return axios.get(url, {
			...options
		});
	},
	post(url, options) {
		// return axios.post(url, qs.stringify({...options}));
		axios({
			method: 'post',
			url: url,
			data: {
				...options
			}
		});
	}
};
