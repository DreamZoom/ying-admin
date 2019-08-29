import Vue from 'vue'
import Router from 'vue-router'
import table from '@/views/table'
import layout from '@/views/layout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table',
      component: table
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    }
  ]
})
