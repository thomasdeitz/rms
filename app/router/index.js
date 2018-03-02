import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import CustomerLookup from '@/views/CustomerLookup'
import Sale from '@/views/Sale'
import SaleTransaction from '@/views/SaleTransaction'
import Sales from '@/views/Sales'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/customerlookup',
      name: 'CustomerLookup',
      component: CustomerLookup
    },
    {
      path: '/sale/:saleId',
      name: 'Sale',
      component: Sale
    },
    {
      path: '/sale/new/:customerId',
      name: 'New Sale',
      component: Sale
    },
    {
      path: '/sale/transaction/:saleId',
      name: 'Sale Transaction',
      component: SaleTransaction
    },
    {
      path: '/sales/',
      name: 'Sales',
      component: Sales
    }
  ]
})
