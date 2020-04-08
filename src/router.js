import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  base: '/DynamicCommonUI-Vue-MobilePart',
  routes: [
    {
      path: '/',
      name: 'login',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Authority/login.vue'),
      meta: {
        // keepAlive: true,
        title: '登陆'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/home',
      name: 'home',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Authority/home.vue'),
      meta: {
        // keepAlive: true,
        title: 'herryHome'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },


    {
      path: '/test',
      name: 'test',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/herry-project/test.vue'),
      meta: {
        // keepAlive: true,
        title: 'test'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },


    
    {
      path: '/zyj',
      name: 'zyj',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/herry-project/zyj.vue'),
      meta: {
        // keepAlive: true,
        title: 'zyj'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },




    // 一下部分为新项目：
    {
      path: '/library',
      name: 'library',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Super/library/library.vue'),
      meta: {
        // keepAlive: true,
        title: 'library'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/management',
      name: 'management',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Super/template/management.vue'),
      meta: {
        // keepAlive: true,
        title: 'management'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/setting',
      name: 'setting',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Super/template/setting.vue'),
      meta: {
        // keepAlive: true,
        title: 'setting'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/createName',
      name: 'createName',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Super/template/createName.vue'),
      meta: {
        // keepAlive: true,
        title: 'createName'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/makeForm',
      name: 'makeForm',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Super/template/makeForm.vue'),
      meta: {
        // keepAlive: true,
        title: 'makeForm'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/ruleSetting',
      name: 'ruleSetting',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Super/template/ruleSetting.vue'),
      meta: {
        // keepAlive: true,
        title: 'ruleSetting'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/ruleTemplate',
      name: 'ruleTemplate',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/Super/template/ruleTemplate.vue'),
      meta: {
        // keepAlive: true,
        title: 'ruleTemplate'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },

  ]
})

export default router
