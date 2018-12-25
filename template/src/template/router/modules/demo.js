const _import = require('../_import')
 

export default {
  path: '/demo',
  component: _import('/layout/Layout.vue'),
  redirect: '/demo/api',
  name: 'Test',
  meta: {
    title: 'Test',
    icon: 'nested'
  },
  children: [

    {
      path: 'index',
      component: _import('/demo/demo-index.vue'),
      name: 'TestIndex',
      meta: { title: 'TestIndex' }
    },
    {
      path: 'api',
      component: _import('/demo/demo-api.vue'),
      name: 'TestApi',
      meta: { title: 'TestApi' }
    },
  ]
}

