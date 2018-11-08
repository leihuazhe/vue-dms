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
      path: '/s-list',
      name: 's-list',
      component: () => import( /* webpackChunkName: "group-foo" */ '@/components/service/s-list'),
      meta: {
        keepAlive: true,
        pageName: '接口管理'
      }
    },
    {
      path: '/s-add',
      name: 's-add',
      component: () => import( /* webpackChunkName: "group-foo" */ '@/components/service/s-add'),
      meta: {
        keepAlive: true,
        pageName: '新增接口'
      }
    },
    {
      path: '/s-mock-rule',
      name: 's-mock-rule',
      component: () => import( /* webpackChunkName: "group-foo" */ '@/components/service/s-mock-rule'),
      meta: {
        keepAlive: true,
        pageName: 'mock查询'
      }
    },
  ],
});
