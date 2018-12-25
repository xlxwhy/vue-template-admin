var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) { s = '0' + s; }
  return s;
};

export default {

  toFixed(v, len) {
    return Number(v).toFixed(len ? len : 0);
  },
  dhmsTomss: function (mss) {
    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (mss % (1000 * 60)) / 1000;
    return { 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
    // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  },

  mssToDhms: function (days, hours, minutes, seconds) {
    return (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000;
  },

  dhmsToss: function (ss) {
    let days = parseInt(ss / (60 * 60 * 24));
    let hours = parseInt((ss % (60 * 60 * 24)) / (60 * 60));
    let minutes = parseInt((ss % (60 * 60)) / 60);
    let seconds = (ss % 60);
    return { 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
    // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  },

  ssToDhms: function (days, hours, minutes, seconds) {
    return ((days * 24 + hours) * 60 + minutes) * 60 + seconds;
  },

  pushDateRange: function (property, dateRange, filters) {
    // console.log(dateRange);
    if (!dateRange[0] && !dateRange[1]) return;
    let beginDate = this.formatDate.format(dateRange[0], 'yyyy/MM/dd hh:mm:ss');
    let endDate = this.formatDate.format(dateRange[1], 'yyyy/MM/dd') + " 23:59:59";
    filters.push({
      "property": property,
      "operator": "ge",
      "value": beginDate
    });
    filters.push({
      "property": property,
      "operator": "le",
      "value": endDate
    });
  },

  formatMoney: function (num) {
    let val = String(num);
    val = val.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    if (val.indexOf(".") < 0 && val != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
      val = parseFloat(val);
    }
    return val;
  },

  getQueryStringByName: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    //var r = window.location.search.substr(1).match(reg);
    var r = window.location.href.match(reg);
    var context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  },

  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
        }
      });
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break;
            case 'M':
              _date.setMonth(_int - 1);
              break;
            case 'd':
              _date.setDate(_int);
              break;
            case 'h':
              _date.setHours(_int);
              break;
            case 'm':
              _date.setMinutes(_int);
              break;
            case 's':
              _date.setSeconds(_int);
              break;
          }
        }
        return _date;
      }
      return null;
    }

  }

};