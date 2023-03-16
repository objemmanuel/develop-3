import SvgIcon from '@/components/SvgIcon'

// https://webpack.docschina.org/guides/dependency-management/#requirecontext
/**
 * 通过 require.context() 函数来创建自己的 context
 * Create your own context through the require.context() function
 */
const svgRequire = require.context('./svg', false, /\.svg$/)
/**
 * 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
 * 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标。
 * 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入。
 * At this time, a function of require is returned, which can accept a parameter of request for the import of require.
 * This function provides three attributes. All svg icons can be obtained through require.keys()
 * Traversing the icon, passing the icon as request into the require import function to complete the import of the local svg icon
 */
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
