import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Payments from '../views/Payments.vue';
import CashPayments from '../views/CashPayments.vue';
import MobileMoney from '../views/MobileMoney.vue';
import Sales from '../views/Sales.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    redirect: '/payments'
  },
  {
    path: '/sales',
    component: Sales
  },
  {
    path: '/payments/',
    component: Payments,
    children: [
      {
        path: '',
        redirect: '/payments/mobile-money'
      },
      {
        path: 'mobile-money',
        component: MobileMoney
      },
      {
        path: '/cash',
        component: CashPayments
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
