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
      path: '/studyWords-setting',
      name: 'studyWords-setting',
      component: () => import(/* webpackChunkName: "about" */ '../src/views/mine/studyWords-setting.vue'),
      meta: {
        title: '学单词设置'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/mine/settings.vue'),
      meta: {
        // keepAlive: true,
        title: '学单词设置'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/valculator',
      name: 'valculator',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/herry-project/valculator.vue'),
      meta: {
        // keepAlive: true,
        title: '计算器'
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      }
    },
    {
      path: '/reply',
      name: 'reply',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/herry-project/reply.vue'),
      meta: {
        // keepAlive: true,
        title: '编辑器'
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
      path: '/resumeDatabase',
      name: 'resumeDatabase',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../src/views/herry-project/resumeDatabase.vue'),
      meta: {
        // keepAlive: true,
        title: 'resumeDatabase'
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

  ]
})

export default router
