import Vue from 'vue'
import Router from 'vue-router'//导入vue-router
import logIN from '../components/common/logIn'
//全局组件
import Parking from '../components/parking/parking'
import Home from '../components/home/home'
import Order from '../components/order/order'

import My from '../components/my/my'
import ComplainOfMy from '../components/my/my-children/complain'
import AboutUsOfMy from '../components/my/my-children/aboutUs'
import MyNewsOfMy from '../components/my/my-children/myNews'
import HelpCenterOfMy from '../components/my/my-children/helpCenter'
import MyPlateOfMy from '../components/my/my-children/myPlate'
import PlateWrite from '../components/common/plateWrite'

// 安装全局组件





// Axios.defaults.baseURL = 'https://user.rongfeng.com/mine/about_us/get'

// Vue.prototype.dataURL = function (file,title,id) {
//     id = (id === undefined)?'':id;
//     return file+'?title='+title+id;
// }
import $ from 'jquery'
Vue.prototype.$jq = $;


// mint-ui组件库
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

Vue.use(Router)

export default new Router({//导出路由
    linkActiveClass:'rlActive',
    routes: [
        {
            path:'/',
            redirect:{name:'login'}//打开网页直接显示登录界面
        },
        {
            path: '/login ',
            name:'login',
            component: logIN,
            meta: { ftShow: false} 
        },
        
        {
            name:'parking',
            path:'/parking',
            component:Parking
        },
        {
            name:'home',
            path:'/home',
            component:Home
        },
        {
            name:'order',
            path:'/order',
            component:Order
        },
        {
            name:'my',
            path:'/my',
            component:My,
            
        },
        {
            name:'my-complain',
            path:'/my/complain',
            component:ComplainOfMy,
            meta: { ftShow: false} 
            
        },
        {
            name:'my-aboutus',
            path:'/my/aboutUs',
            component:AboutUsOfMy,
            meta: { ftShow: false} 
            
        },
        {
            name:'my-mynews',
            path:'/my/myNews',
            component:MyNewsOfMy,
            meta: { ftShow: false} 
            
        },
        {
            name:'my-helpcenter',
            path:'/my/helpCenter',
            component:HelpCenterOfMy,
            meta: { ftShow: false} 
            
        },
        {
            name:'my-myplate',
            path:'/my/myPlate',
            component:MyPlateOfMy,
            meta: { ftShow: false} 
            
        },
        {
            name:'platewrite',
            path:'/common/plateWrite',
            component:PlateWrite,
            meta: { ftShow: false} 
            
        }
    ]
})
