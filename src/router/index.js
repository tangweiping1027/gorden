import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from '@/config/routerConfig'
import Layout from '@/components/layout/index'

Vue.use(Router)
const routes = {
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/controller/email/inbox',
      component: Layout,
      children: routerConfig
    }
  ]
}

export const router = new Router(routes)
function formatNavSide(routes) {
  let arr = []
  routes.forEach(item => {
    let obj = {
      path: item.path,
      name: item.name,
      icon: item.icon
    }
    if (item.children && Array.isArray(item.children) && item.children.length) {
      obj.children = formatNavSide(item.children)
    }
    arr.push(obj)
  })

  return arr
}
export const navSide = formatNavSide(routes.routes)
