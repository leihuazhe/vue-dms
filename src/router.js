import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/m-list',
      name: 'm-list',
      component: () => import('@/components/method/m-list'),
      meta: {
        keepAlive: true,
        pageName: '接口管理'
      }
    },
    {
      path: '/m-mock-rule/:id',
      name: 'm-mock-rule',
      component: () => import('@/components/method/m-mock-rule'),
      meta: {
        keepAlive: true,
        pageName: 'mock查询'
      }
    },
    {
      path: '/s-list',
      name: 'SList',
      component: () => import('@/components/serve/s-list'),
      meta: {
        keepAlive: true,
        pageName: '服务管理'
      }
    },
    {
      path: '/s-add',
      name: 'SAdd',
      component: () => import('@/components/serve/s-add'),
      meta: {
        keepAlive: true,
        pageName: '新增服务'
      }
    },
    {
      path: '/s-modify',
      name: 'SModify',
      component: () => import('@/components/serve/s-modify'),
      meta: {
        keepAlive: true,
        pageName: '修改服务'
      }
    },
    {
      path: '/s-metadata',
      name: 'SMetadata',
      component: () => import('@/components/serve/s-metadata'),
      meta: {
        keepAlive: true,
        pageName: '查看元数据信息'
      }
    }
  ]
})
