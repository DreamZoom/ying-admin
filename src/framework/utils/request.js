import axios from "axios";
import qs from "querystring";
import { message, notification } from "ant-design-vue";

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
const request = axios.create({
    baseURL: '/',
    transformRequest: [function (data) {
        return qs.stringify(data);
    }]
});
request.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem("token");
    if (token) {
        token = JSON.parse(token);
        config.headers.Authorization = `${token.token_type} ${token.access_token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
request.interceptors.response.use(function (response) {
    return Promise.resolve(response);
}, function (error) {
    console.log(error);
    const { response } = error;
    if (response && response.status) {
        const { data } = response;
        const errorText = codeMessage[response.status] || response.statusText;
        notification.error({
            message: `请求错误 ${response.status}:`,
            description: `${errorText}`,
        });
        console.warn(data)
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }
    return Promise.reject(error);;
});
export default request;