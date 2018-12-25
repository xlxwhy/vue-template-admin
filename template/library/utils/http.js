import axios from 'axios'
import Qs from 'qs'
import AuthConst from "@/constants/AuthConst.js"
import Cookies from 'js-cookie'

axios.defaults.timeout = 15000;
axios.defaults.baseURL = '/';
axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' }


axios.defaults.paramsSerializer = function (params) {
    return Qs.stringify(params)
}
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (Cookies.get(AuthConst.Token.PLATFORM)) {
            config.headers.Authorization = Cookies.get(AuthConst.Token.PLATFORM);
        }
        if (Cookies.get(AuthConst.OPENID)) {
            config.headers.OpenId = Cookies.get(AuthConst.OPENID)
        }
        return config;
    },
    err => {
        return Promise.reject({ msg: err, statusCode: -1 });
    });

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log("response error!")
        console.log(error)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                case 404:
                    alert("接口不存在!!")
                case 500:
                    alert('服务器出错啦!!')
                case 504: // Bad Gateway
                    alert('服务器出小差啦!!')
            }
            return Promise.reject({ msg: error, statusCode: error.response.status })
        }
        return Promise.reject({ msg: error, statusCode: 0 })
    }
);


export default axios;
