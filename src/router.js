import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      redirect: '/about',
      name: 'Dapeng Mock Server',
      meta: { title: '首页' },
      // rewriteUrl: '/about',
      hidden: true
    },
    {
      path: '/about',
      name: 'about',
      meta: { pageName: '首页' },
      component: () => import('@/components/dashboard/index')
    },
    {
      //带 ? 为可选
      path: '/m-list/:id?',
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
    },
    {
      path: '/m-mock-json',
      name: 'SmockJson',
      component: () => import('@/components/method/m-mock-json'),
      meta: {
        keepAlive: true,
        pageName: '查看Mock Json'
      }
    },
    {
      path: '/m-d-list',
      name: 'm-d-list',
      component: () => import('@/components/metadata/m-d-list'),
      meta: {
        keepAlive: true,
        pageName: '元数据管理'
      }
    }
  ]
})
