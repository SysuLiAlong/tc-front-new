import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../components/Login')
  },  {
    path: '/picker',
    name: 'TestVanField',
    component: () => import('../components/test/TestVanField')
  }, {
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
    path: '/test/touch',
    name: 'touchEvent',
    component: () => import('../components/test/TouchEvent')
  },
  {
    path: '/test/scroll',
    name: 'scroll',
    component: () => import('../components/test/ScrollTest')
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
    path: '/produce/detail',
    name: 'produceDetail',
    component: () => import('../components/produce/detail')
  },
  {
    path: '/test/select',
    name: 'testSelect',
    component: () => import('../components/test/SelectTest')
  },
  {
    path: '/test/bind',
    name: 'testBind',
    component: () => import('../components/test/BindTest')
  },
  {
    path: '/test/check_box',
    name: 'checkBox',
    component: () => import('../components/test/CheckBoxTest')
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
  }


]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export {
  router
}
