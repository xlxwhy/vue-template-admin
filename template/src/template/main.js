
import Vue from 'vue'
import App from './App'
// import router from './routers'
import router from './router/index.js'
import store from './store/index.js'  
import i18n from './lang' 
 

import './components/init.js'
import './filters/init.js'
import './icons/init.js' 
import './main-permission.js'  
import './main-prototype.js'  
import './main-axios.js'  
import './errorLog'  
import './mock' 

Vue.config.productionTip = false;



new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
