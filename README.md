# （一）项目工程介绍

    DynamicMobileDemo是一个专门为移动端编写的Vue版的框架，使用的VUE3.0的框架，引入的Vant组件库2.2.13版本进行开发
    
    支持现代浏览器以及 Android 4.0+, iOS 7+
    

# （二）项目特点

      1.内置拦截器，可以预先拦截http的状态码，进行业务处理
        
      2.引用 flexible.js ，实现不同屏幕尺寸的移动端，页面内容按比例缩放
        
      3.内置路由守卫，实现权限控制，不同权限只能访问指定的页面
   

# （三）项目的基本结构


        ├─DynamicCommonUI-Vue-MobilePart
        │  │
        │  ├─css //自动生成的CSS样式文件夹
        │  │      about.b87a2cc3.css
        │  │      app.4a011a50.css
        │  │      chunk-vendors.ecafd180.css
        │  │
        │  ├─img  //图片文件夹
        │  │      A梦.15d3e922.png 
        │  │      logo.3e69f056.jpg
        │  │      qq.93542236.png
        │  │      timg.8e23c744.jpg
        │  │      头像.db6fdcfc.jpg
        │  │      奖牌.55747871.png
        │  │      无通知.faac5a93.png
        │  │
        │  └─js  //自动生成的js文件夹
        │          about.86780709.js
        │          about.86780709.js.map
        │          app.772bdd3f.js
        │          app.772bdd3f.js.map
        │          chunk-vendors.c2527792.js
        │          chunk-vendors.c2527792.js.map
        │
        └─src  //项目主目录
            │  App.vue
            │  main.js
            │  router.js
            │  setHtmlFontSize.js
            │  store.js
            │
            ├─api  //调用的后端接口文件夹
            │  ├─battleTeamInfo
            │  │      waitBattleTeamInfo.js
            │  │
            │  └─userManager
            │          user.js
            │
            ├─assets //项目图片资源文件
            │  └─img
            │          A梦.png
            │          dd.png
            │          login-bottom.png
            │          logo.jpg
            │          noMessage.png
            │          qq.png
            │          timg.jpg
            │          wx.png
            │          头像.jpg
            │          奖牌.png
            │          无通知.png
            │
            ├─components
            │      bottomNav.vue
            │
            ├─utils 
            │      dynamicAxios.js  // 拦截器
            │
            └─views // 存放页面的文件夹
                │  About.vue
                │  Home.vue
                │
                ├─addRessList
                │      addressList.vue
                │
                ├─Login
                │      login.vue
                │
                ├─mainInfo
                │      mainInfo.vue
                │      mainInfoDetail.vue
                │
                ├─message
                │      myMessage.vue
                │      noMessage.vue
                │
                ├─multiTabs
                │      multiTabs.vue
                │
                ├─rankingList
                │      rankingList.vue
                │
                ├─search
                │      search.vue
                │
                └─showData
                        barAndTabs.vue
                        myData.vue
                        raderAndLine.vue


# （四）项目启动命令

    使用本框架需要安装依赖，运行即可
    
        1.安装依赖命令： npm install
        
        2.运行命令： npm run serve


# （五）拦截器使用方法

    使用拦截器的目的在于可以快速的根据http返回的状态码预先进行操作，如返回 401 状态码跳转到登录界面，并且还可以对发送的请求进行一些预先处理，如添加 Token验证信息等。
    
    本项目拦截器对官方axios进行了一层封装，修改了axios请求的地址为具体的项目后台的地址。
    
    
        1.设置axios的 baseUrl，用于指定具体的项目地址
          
          axios.defaults.baseURL = 'http://项目地址:端口号/'
          
        
        2.给发送的http请求设置token
         
           axios.interceptors.request.use(config => {

                config.headers.Authorization= localStorage.getItem("token") //从localstroage中获取token，并添加到http请求的header中
  
                return config
                
           }, error => { Promise.reject(error) })
        
        3. 设置具体的http错误状态码并进行提示
            axios.interceptors.response.use(response => {
            
                return response//此处表示我们的请求让服务器正确的接收了，并且返回了数据（状态码 200）
                
            }, error => {
            
              //此处表示服务器没有正确的处理我们的请求，然后给我们返回了错误的数据信息
              
              //status 表示 错误的http状态码
              
              if (!error.response) {
              
                Notify({ type: 'warning',duration: 1000, message: '服务器出现问题，请稍后重试！' });
                
                router.push({name: 'login'});
                
              } 
              const status = error.response.status
              
              switch (status) { // 其他情况补充处理
              
                case 500:
                    Notify({ type: 'warning', duration: 1000, message: '服务器响应出现问题，请稍后重试！' });
                  break;
                case 400:
                    Notify({ type: 'warning', duration: 1000, message: '服务器无法理解请求参数，请稍后重试！' });
                  break;
                case 401:
                    Notify({ type: 'warning', duration: 1000, message: '访问资源未授权，请登陆后重试！' });
                    router.push({name: 'login'});
                  break;
                case 403:
                    Notify({ type: 'warning', duration: 1000, message: '请求资源暂时不可用，请登陆后重试！' });
                    router.push({name: 'login'});
                  break;
                case 404:
                    Notify({ type: 'warning', duration: 1000, message: '请求资源暂不存在，请稍后重试！' });
                  break;
              }
              return Promise.reject(error)
            }
            
        4. 使用axios发送请求
        
           1.发送Get请求
                vm.$axios
                  .get(api地址)
                  .then(res => {
                    if (res.data.code === "0000") {
                        //根据返回的数据，进行相应操作
                    } else if(res.data.code === "2222") {
                      // 跳转到结算界面
                      vm.$router.push({name:'successJumpPage',path:"/successJumpPage",params:{pageName:vm.pageName,pageAddress:vm.pageAddress}});
                    }
                  });
                  
                  
           
           2.发送post请求 
           
                vm.$axios
                    .post(login, {
                      userCode: this.userName,
                      password: this.password
                    })
                    .then(res => {
                        //根据返回的数据进行相应的操作
                    });
            
           3.发送delete请求
           
                vm.$axios
                  .delete(login, {
                      userCode: this.userName,
                      password: this.password
                    })
                    .then(res => {
                        //根据返回的数据进行相应的操作
                    });
           
    
# （六）路由守卫使用方法
    
    使用路由守卫的目的在于可以页面跳转的时候进行一些判断，如当前此账号是否的级别是否可以跳转到某个指定的界面等
    
    路由守卫一般搭配路由列表使用，这样用户在跳转的页面的时候，就可以方便的判断当前的页面是否允许某个级别的用户跳转
    
        1.路由守卫判断页面权限
        
            //路由守卫，当跳转需要 验证权限的界面的时候进行判断
            
            //to表示 从哪个地址跳转过来的
            
            //from表示需要跳转的地址
            
            //next表示执行跳转命令
            
            router.beforeEach((to, from, next) => {  
            
              //判断登录的界面是否需要验证token
              
              if (to.meta.requireAuth) {
              
                //如果需要登录权限，则去store中去拿token
                
                if (store.state.token) {
                
                  // 从store中获取到token
                  
                  // 跳转到下一界面
                  
                  next()
                  
                } else {
                
                  // 没有从store中获取到token
                  
                  // 保存当前请求的路径，先跳转到登录界面，然后登录以后跳转到接下来的界面
                  
                  next({
                  
                    path: '/login',
                    
                    query: {
                    
                      redirect: to.fullPath  //当前保存的路径，用于登陆后重定向到此处
                      
                    }
                    
                  })
                  
                }
                
              } else {
              
                next()
                
              }
              
            })
   

