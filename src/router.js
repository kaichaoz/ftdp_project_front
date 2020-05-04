import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  base: "/DynamicCommonUI-Vue-MobilePart",
  routes: [
    {
      path: "/",
      name: "login",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Authority/login.vue"),
      meta: {
        // keepAlive: true,
        title: "登陆",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
    {
      path: "/home",
      name: "home",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Authority/home.vue"),
      meta: {
        // keepAlive: true,
        title: "herryHome",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },

    {
      path: "/test",
      name: "test",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/herry-project/test.vue"),
      meta: {
        // keepAlive: true,
        title: "test",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },

    // 以下部分为新项目：
    {
      path: "/library",
      name: "library",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Super/library/library.vue"),
      meta: {
        // keepAlive: true,
        title: "library",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
    {
      path: "/management",
      name: "management",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Super/template/management.vue"),
      meta: {
        // keepAlive: true,
        title: "management",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
    {
      path: "/setting",
      name: "setting",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Super/template/setting.vue"),
      meta: {
        // keepAlive: true,
        title: "setting",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
    {
      path: "/createName",
      name: "createName",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Super/template/createName.vue"),
      meta: {
        // keepAlive: true,
        title: "createName",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
    {
      path: "/makeForm",
      name: "makeForm",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Super/template/makeForm.vue"),
      meta: {
        // keepAlive: true,
        title: "makeForm",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
    {
      path: "/ruleSetting",
      name: "ruleSetting",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Super/template/ruleSetting.vue"),
      meta: {
        // keepAlive: true,
        title: "ruleSetting",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
    {
      path: "/ruleTemplate",
      name: "ruleTemplate",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../src/views/Super/template/ruleTemplate.vue"),
      meta: {
        // keepAlive: true,
        title: "ruleTemplate",
        // requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
      },
    },
  ],
});

// 路由钩子
// 先判断不可以通过修改路由而进入页面
// 然后判断没有登陆不可以进入（登陆后将logIn=0）
router.beforeEach((to, from, next) => {
  // 当前的路由name
  var fromRoutes = ["library", "management", "setting", "createName", "makeForm", "ruleSetting", "ruleTemplate"];
  // 需要去的路由name(存放正常的页面)
  var toRoutes = ["library", "management", "setting", "createName", "makeForm", "ruleSetting", "ruleTemplate"];

  // 如果等于-1表示没有存储上面两个数组中
  if (toRoutes.indexOf(to.name) !== -1) {
    let fromName = window.location.hash  // 获取当前路由后面的地址 
    fromName = fromName.slice(2) // 去掉 “/# ”

    // 如果当前路径名字不是当前名字（意味着通过修改路径名字进行访问），则直接进入到登陆页面
    if (from.name != fromName) {
      next({ path: '/', }); // 跳转登陆
    }

    // 获取登陆存储的值，如果为0表示可以进行输入路由跳转，否则不可以跳转
    const a = sessionStorage.getItem("logIn")
    if (a == "0") {
      next(); // 继续执行
      return;
    } else {
      next({ path: '/', }); // 跳转登陆
      return;
    }
  }
  else {
    next();
    return;
  }

});

export default router;
