

// 检验手机号
export const checkMobile = (rule, value, callback) => {
    if(!value) {
        return callback(new Error('手机号不能为空'));
    }else if(value.length !== 11){
        return callback(new Error('手机号长度不正确'));
    }else if(!/^1[3|4|5|7|8][0-9]{9}$/.test(value)){
        return callback(new Error('手机号格式不正确'));
    }
    callback();
}

// 检查是否选择了省市区
export const checkCity = (rule, value, callback) => {
    console.log(value)
    if(!value) {
        return callback(new Error('街道地址不能为空'));
    }else if(value.length !== 3){
        return callback(new Error('请选择正确地区'));
    }
    callback();
}