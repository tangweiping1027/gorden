import layoutBody from 'Components/layout/layoutBody'
const routes = [
  {
    path: 'controller',
    name: '控制中心',
    redirect: '/controller/email/inbox',
    component: layoutBody,
    children: [
      {
        path: 'email',
        name: '邮箱',
        component: () => import('Components/layout/main'),
        children: [
          {
            path: 'inbox',
            name: '收件箱',
            component: () => import('Views/controller/email/inbox')
          }
        ]
      },
      {
        path: 'manager',
        icon: 'el-icon-user',
        name: '管理',
        component: () => import('Components/layout/main'),
        children: [
          {
            name: '人员管理',
            path: 'person',
            component: () => import('Views/controller/manager/person')
          }
        ]
      }
    ]
  }
]

function formatRouter(routes, basePath = '/') {
  let arr = []
  routes.forEach(item => {
    let obj = {
      path: `${basePath}${item.path.replace(/^\//, '')}/`,
      name: item.name
    }
    item.redirect && (obj.redirect = item.redirect)
    item.icon && (obj.icon = item.icon)
    item.component && (obj.component = item.component)
    // item.component &&
    //   (obj.component = () =>
    //     import(`@/views/${item.component.replace(/^\//, '')}`))

    if (item.children && item.children.length) {
      obj.children = formatRouter(item.children, obj.path)
    }
    arr.push(obj)
  })
  return arr
}

export default formatRouter(routes)
