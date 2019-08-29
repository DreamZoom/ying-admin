import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
			// headers:{
			// 	"Content-Type":"multipart/form-data"
			// },

			data: qs.stringify(
				{
					...data
				},
				{ arrayFormat: 'repeat' }
			)
		});
	}
};
