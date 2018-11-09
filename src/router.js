import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/m-list',
      name: 'm-list',
      component: () => import( /* webpackChunkName: "group-foo" */ '@/components/method/m-list'),
      meta: {
        keepAlive: true,
        pageName: '接口管理'
      }
    },
    {
      path: '/m-add',
      name: 'm-add',
      component: () => import( /* webpackChunkName: "group-foo" */ '@/components/method/m-add'),
      meta: {
        keepAlive: true,
        pageName: '新增接口'
      }
    },
    {
      path: '/m-mock-rule',
      name: 'm-mock-rule',
      component: () => import( /* webpackChunkName: "group-foo" */ '@/components/method/m-mock-rule'),
      meta: {
        keepAlive: true,
        pageName: 'mock查询'
      }
    },
    {
      path: '/s-list',
      name: 'SList',
      component: () => import(/* webpackChunkName: "group-foo" */ '@/components/serve/s-list'),
      meta: {
        keepAlive: true,
        pageName: '服务管理'
      }
    },
    {
      path: '/s-add',
      name: 'SAdd',
      component: () => import(/* webpackChunkName: "group-foo" */ '@/components/serve/s-add'),
      meta: {
        keepAlive: true,
        pageName: '新增服务'
      }
    },
    {
      path: '/s-modify',
      name: 'SModify',
      component: () => import(/* webpackChunkName: "group-foo" */ '@/components/serve/s-modify'),
      meta: {
        keepAlive: true,
        pageName: '修改服务'
      }
    }
  ]
})
