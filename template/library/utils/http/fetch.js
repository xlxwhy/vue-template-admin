
import http from './http.js'
import consts from './consts.js'
import global from "./global.js"; 

export default (data, success, error, method, url) => {
    let option = {
        method: method,
        url: url,
    }
    if (data) {
        option.params = data.query
        option.data = data.body
    }
    // loading: store.commit('loading_show');
    return http(option).then((res) => {
        if (global.api && global.api.authCallback) {
        } else {
            console.log(`WARNING: no auth error callback function! pls rewrite /http/global.api.authCallback `);
        }
        if (res.data && res.data.code == consts.SUCCESS) {
            success && success(res.data);
        } else if (res.data.code == consts.AUTH_ERROR) {
            if (global.api && global.api.authCallback) {
                global.api.authCallback(res.data)
            } else {
                console.log(`WARNING: no auth error callback function! pls rewrite /http/global.api.authCallback `);
            }
            if (error) {
                error(res.data);
            }
        } else {
            if (!error) {
                console.log(res.data)
            } else {
                error(res.data);
            }
        }
        // store.commit('loading_hide');
    }).catch((err) => {
        // end-loading:  store.commit('loading_hide'); 
        error && error(err);
    });

}