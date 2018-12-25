import Mock from 'mockjs'
import LoginApi from './apis/login/LoginApi.js'
import MemberApi from './apis/infra-member/MemberApi.js'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

Mock.setup({
  timeout: '350-600'
})

// LoginApi
Mock.mock(/\/login\/login/, 'post', LoginApi.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', LoginApi.logout)
Mock.mock(/\/user\/info\.*/, 'get', LoginApi.getUserInfo)

// MemberApi
Mock.mock(/\/platform\/member\/list/, 'post', MemberApi.list) 
Mock.mock(/\/member\/list/, 'post', MemberApi.list) 
export default Mock
