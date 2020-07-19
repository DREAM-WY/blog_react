/*
 * @Author: wuyu
 * @Date: 2020-07-16 10:35:44
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-16 10:38:21
 * @Description:  代理 跨域
 * @FilePath: /blog_react/src/setupProxy.js
 */
const proxy = require("http-proxy-middleware")
// app 这个app 代表的是服务器 是webpack-dev-server 底层用express实现的
module.exports = function (app) {
	app.use(
		"/dmx/api",
		proxy.createProxyMiddleware({
			target: "https://www.codedmx.top",
			// target: 'http://localhost:6666',
			changeOrigin: true,
		})
	)
}
