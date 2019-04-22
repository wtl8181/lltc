import Vue from 'vue'
import Router from 'vue-router'//导入vue-router
import logIN from '../components/common/logIn'
//全局组件
import Parking from '../components/parking/parking'
import Home from '../components/home/home'
import Order from '../components/order/order'
import OrderDetail from '../components/order/orderDetail'
import My from '../components/my/my'
import ComplainOfMy from '../components/my/my-children/complain'
import MoneyOfMy from '../components/my/my-children/myMoney'
import BillOfMy from '../components/my/my-children/myBill'
import AboutUsOfMy from '../components/my/my-children/aboutUs'
import MyNewsOfMy from '../components/my/my-children/myNews'
import HelpCenterOfMy from '../components/my/my-children/helpCenter'
import helpDetail from '../components/common/helpDetail'
import MyPlateOfMy from '../components/my/my-children/myPlate'
import PlateWrite from '../components/common/plateWrite'
import protocol from '../components/common/proto'
// 全局组件

Vue.use(Router)
export default new Router({//导出路由
    linkActiveClass:'rlActive',
    routes: [
        {
            name:'login',
            path: '/',
            component: logIN,
            meta: { ftShow: false}
        },
       {
           path: '/protocol',
           name:'protocol',
           component: protocol,
           meta: { ftShow: false}
       },

        {
            name:'parking',
            path:'/parking',
            component:Parking,
            meta: {requireAuth: true}
        },
        {
            name:'home',
            path:'/home',
            component:Home,
            meta: {requireAuth: true}
        },
        {
            name:'order',
            path:'/order',
            component:Order,
            meta: {requireAuth: true}
        },
        {
            name:'orderdetail',
            path:'/order/ordertail',
            component:OrderDetail,
            meta: {ftShow: false,requireAuth: true}
        },
        {
            name:'my',
            path:'/my',
            component:My,
            meta: {requireAuth: true}

        },
        {
            name:'my-complain',
            path:'/my/complain',
            component:ComplainOfMy,
            meta: { ftShow: false,requireAuth: true}

        },
       {
           name:'my-money',
           path:'/my/money',
           component:MoneyOfMy,
           meta: { ftShow: false,requireAuth: true}

       },
      {
        name:'my-bill',
        path:'/my/bill',
        component:BillOfMy,
        meta: { ftShow: false,requireAuth: true}

      },
        {
            name:'my-aboutus',
            path:'/my/aboutUs',
            component:AboutUsOfMy,
            meta: { ftShow: false,requireAuth: true}

        },
        {
            name:'my-mynews',
            path:'/my/myNews',
            component:MyNewsOfMy,
            meta: { ftShow: false,requireAuth: true}

        },
        {
            name:'my-helpcenter',
            path:'/my/helpCenter',
            component:HelpCenterOfMy,
            meta: { ftShow: false,requireAuth: true}

        },
        {
          name:'helpdetail',
          path:'/common/helpDetail',
          component:helpDetail,
          meta: { ftShow: false,requireAuth: true}

        },
        {
            name:'my-myplate',
            path:'/my/myPlate',
            component:MyPlateOfMy,
            meta: { ftShow: false,requireAuth: true}

        },
        {
            name:'platewrite',
            path:'/common/plateWrite',
            component:PlateWrite,
            meta: { ftShow: false,requireAuth: true}
        }
    ]
})
