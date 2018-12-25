
export default {



  /**
   * 
  //统一左上角返回按钮的逻辑，支持以下格式的调用
  //[1] @click="$back"
  //[2] @click="$back()"
  //[3] @click="$back('/manor/list')"
  //[4] @click="$back('http://www.baidu.com')"
  
   */
  back(path) {
    let isPath = (typeof path == 'string')
    if (isPath) {
      let isHttp = path.indexOf('http://') >= 0;
      window.location.href = isHttp ? path : ("#" + path);
    } else {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "#/";
      }
    }
  }

};
