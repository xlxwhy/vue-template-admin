import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import i18n from '../lang' 



Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
}) 


// import { Lazyload } from 'vant'
// import LoadingImg from '@/../static/images/banner/loading.png'
// Vue.use(Lazyload, {
//   loading: LoadingImg,
//   error: LoadingImg
// })
