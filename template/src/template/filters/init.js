
import Vue from 'vue'

// register global utility filters.
import * as filters from '@/../library/filters' // 全局filter  
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


