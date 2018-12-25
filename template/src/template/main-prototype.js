import Vue from 'vue'


import Cookie from 'js-cookie'
Vue.prototype.$cookie = Cookie;

{{#useCommonLayer }}
import VuePrototype from "common-layer/utils/vue/VuePrototype.js"
{{else}}
import VuePrototype from "@/../library/utils/vue/VuePrototype.js" 
{{/useCommonLayer }}

Vue.prototype.$back = VuePrototype.back;

