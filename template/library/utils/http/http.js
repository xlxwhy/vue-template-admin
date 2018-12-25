import axios from 'axios'
import Qs from 'qs'
import consts from "./consts.js"
import Cookies from 'js-cookie'
import global from "./global.js";//子工程可以改写
axios.defaults.timeout = 15000;
axios.defaults.baseURL = global.BASE_URL ? global.BASE_URL : '/';
axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' }


axios.defaults.paramsSerializer = function (params) {
    return Qs.stringify(params)
}
// http request 拦截器
axios.interceptors.request.use(
    config => {
        //Authorization
        let authKey = consts.AuthKey.MEMBER;
        if (global && global.AUTH_KEY) {
            authKey = global.AUTH_KEY;
        } else {
            console.log(`WARNING: use default AUTH_KEY=[${authKey}]`);
        }
        let auth = Cookies.get(authKey)
        if (auth) {
            config.headers.Authorization = auth;
        }
        //openId
        let openIdKey = consts.OPENID_KEY;
        if (global && global.OPENID_KEY) { openIdKey = global.OPENID_KEY; };
        let openId = Cookies.get(openIdKey)
        if (openId) {
            config.headers.OpenId = openId;
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
                    break;
                case 500:
                    alert('服务器出错啦!!')
                    break;
                case 504: // Bad Gateway
                    alert('服务器出小差啦!!')
                    break;
            }
            return Promise.reject({ msg: error, statusCode: error.response.status })
        }
        return Promise.reject({ msg: error, statusCode: 0 })
    }
);


export default axios;
