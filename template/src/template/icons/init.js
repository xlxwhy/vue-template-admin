
import Vue from 'vue'
{{#useCommonLayer }}
import Icon from 'common-layer/ui/components/icon/Index.vue'// svg组件
{{else}}
import Icon from '../../../library/ui/components/icon/Index.vue'// svg组件
{{/useCommonLayer }}


  
// register globally
Vue.component('icon', Icon)

const requireAll = requireContext => requireContext.keys().map(requireContext)

 
{{#useCommonLayer }}
requireAll(require.context('common-layer/ui/icons/svg', false, /\.svg$/))
{{/useCommonLayer }}
requireAll(require.context( "../../../library/ui/icons/svg" , false, /\.svg$/))   


