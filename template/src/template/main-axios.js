


{{#useCommonLayer }}
import __axios_global from "common-layer/utils/http/global.js";
import consts from "common-layer/consts/AuthConst.js";
{{else}}
import __axios_global from "@/../library/utils/http/global.js";
import consts from "@/../library/utils/http/consts.js";
{{/useCommonLayer }}

__axios_global.AUTH_KEY = consts.AuthKey.MEMBER;          //改写：存储Token的Key
__axios_global.BASE_URL = "http://www.mwt315.com";        //改写：API基础路径
__axios_global.api.authCallback = () => {                 //改写：调用API判断出Token失效时的处理函数
  // const signinUrl = `http://mobile.mwt315.com/mobile/views/admin.html#/login?redirect=` + encodeURIComponent(window.location.href);
  // window.location.href = signinUrl;
}

