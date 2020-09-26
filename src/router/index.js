import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../components/Login')
  },
  {
    path: '/material',
    name: 'material',
    component: () => import('../components/Material')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../components/Main'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('../components/UserInfo')
  },
  {
    path: '/process',
    name: 'process',
    component: () => import('../components/process/list')
  },
  {
    path: '/process/detail',
    name: 'processDetail',
    component: () => import('../components/process/detail')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../components/product/list')
  },
  {
    path: '/product/detail',
    name: 'productDetail',
    component: () => import('../components/product/detail')
  },
  {
    path: '/produce',
    name: 'produce',
    component: () => import('../components/produce/list')
  },
  {
    path: '/produce/add',
    name: 'produceAdd',
    component: () => import('../components/produce/add')
  },
  {
    path: '/produce/product/detail',
    name: 'produceProductDetail',
    component: () => import('../components/produce/produceProductDetail')
  },
  {
    path: '/produce/detail',
    name: 'produceDetail',
    component: () => import('../components/produce/produceDetail')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../components/account/list')
  },
  {
    path: '/account/detail',
    name: 'accountDetail',
    component: () => import('../components/account/detail')
  },
  {
    path: '/account/add',
    name: 'addAccount',
    component: () => import('../components/account/add')
  },
  {
    path: '/alarm',
    name: 'alarmList',
    component: () => import('../components/alarm/list')
  }


]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({ routes })

export {
  router
}
