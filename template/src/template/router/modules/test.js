const _import = require('../_import')
 

export default {
  path: '/test',
  component: _import('/layout/Layout.vue'),
  redirect: '/test/api',
  name: 'Test',
  meta: {
    title: 'Test',
    icon: 'nested'
  },
  children: [

    {
      path: 'index',
      component: _import('/test/test-index.vue'),
      name: 'TestIndex',
      meta: { title: 'TestIndex' }
    },
    {
      path: 'api',
      component: _import('/test/test-api.vue'),
      name: 'TestApi',
      meta: { title: 'TestApi' }
    },
  ]
}

