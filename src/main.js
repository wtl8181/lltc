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
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ 
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
