/* eslint-disable camelcase */
import Vue from 'vue'
import Router from 'vue-router'
import homepage from '../components/homepage.vue'
import login from '../components/index/login&regin/login.vue'
import borrow_money from '../components/sidemenu/borrow_money.vue'
import personal_center from '@/components/sidemenu/personal_center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homepage
    },
    {
      path: '/borrow_money',
      component: borrow_money
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/personal_center',
      component: personal_center
    }
  ]
})
