import path from 'path'
/**
 * 返回所有子路由
 * Return all sub-routes
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * Process routes out of hierarchy: if a first-level route is another sub-route, the first-level route will be deleted and the routing hierarchy will be retained
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 * Judge whether the data is null
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 * Return the corresponding menu rule array according to the routes data
 */
export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  // Traverse routing table
  routes.forEach(item => {
    // 不存在 children 且 不存在 meta 直接 return
    // No children and no meta, direct return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 且 不存在 meta，进入迭代
    // There are children and no meta, enter iteration
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    // Merge path as jump path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    // After route separation, there is a parent route with the same name, which needs to be handled separately
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      // Both icon and title must exist
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 存在 children 则 进入迭代
    // If there are children, enter the iteration
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
