
import http from './http.js'
import CodeConst from '@/constants/CodeConst.js'
// import store from '@/vuex/store' 
import {
    Message,
    MessageBox
} from 'element-ui'


export default (data, success, error, method, url, query) => {
    let option = {
        method: method,
        url: url,
    }
    if (method.toLowerCase() === "get" || (query && query.toLowerCase() == "query")) {
        option.params = data;
    } else {
        option.data = data;
    }

    // loading: store.commit('loading_show');
    return http(option).then((res) => {
        if (res.data && res.data.code == CodeConst.SUCCESS) {
            success && success(res.data);

        } else if (res.data.code == CodeConst.AUTH_ERROR) {
            const signinUrl = `#/login?redirect=` + window.encodeURIComponent(window.location.href);//WARN
            window.location.href = signinUrl;
        } else {
            if (!error) {
                console.log(res.data)
            }
            Message({
                message: res.data,
                type: 'error',
                duration: 5 * 1000
            });
        }
        if (!success) { return res.data }
        // store.commit('loading_hide');
    }).catch((err) => {
        // end-loading:  store.commit('loading_hide'); 
        error && error(err);
    });

}