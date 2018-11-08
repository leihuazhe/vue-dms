import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/p-list',
      name: 'PList',
      component: () => import(/* webpackChunkName: "group-foo" */ '@/components/project/p-list'),
      meta: {
        keepAlive: true,
        pageName: '项目列表'
      }
    },
    {
      path: '/p-add',
      name: 'PAdd',
      component: () => import(/* webpackChunkName: "group-foo" */ '@/components/project/p-add'),
      meta: {
        keepAlive: true,
        pageName: '添加项目'
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
    },
  ],
});
