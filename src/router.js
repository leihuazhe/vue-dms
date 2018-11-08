import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const PList = resolve => require.ensure([], () => resolve(require('@/components/project/p-list')), 'project')
const PAdd = resolve => require.ensure([], () => resolve(require('@/components/project/p-add')), 'project')

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
      // component: () => import(/* webpackChunkName: "group-foo" */ '@/components/project/p-list'),
      component: PList
    },
    {
      path: '/p-add',
      name: 'PAdd',
      // component: () => import(/* webpackChunkName: "group-foo" */ '@/components/project/p-add'),
      component: PAdd
    },
  ],
});
