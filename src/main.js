// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/global.css'
import '../static/fonts/iconfont.css'
import Axios from 'axios'
import  store from './store'
import AMap from 'vue-amap'
Vue.use(AMap)
Vue.prototype.$ajax = Axios  //安装axios
// Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.config.productionTip = false
import $ from 'jquery'
Vue.prototype.$jq = $;


// mint-ui组件库
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.use(Mint)


new Vue({
    el: '#app',
    router,
    store,
    Mint,
    components: {App},
    template: '<App/>'
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next();
    } else {
      next({
        path: "/"//指向为你的登录界面
      });
    }
  } else {
    next();
  }
  if (to.fullPath === "/") {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
//    路由守卫
