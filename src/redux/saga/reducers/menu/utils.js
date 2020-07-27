/*
 * @Author: wuyu
 * @Date: 2020-07-25 09:44:43
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-26 23:42:13
 * @Description:
 * @FilePath: /blog_react/src/redux/saga/reducers/menu/utils.js
 */

const breadcrumd = {}
/**
 *
 * @params: rootPath 根路径
 */
export const createMenu = (rootPath, routes, permissions) => {
	const menu = []

	routes.forEach(subMenu => {
		console.log(subMenu, "subMenu")
		const underMenu = []
		if (subMenu.routes) {
			// 如果routes存在去遍历这个对象
			subMenu.routes.forEach(under => {
				const basePath = rootPath + subMenu.path
				if (permissions) {
					// 处理权限
				}
				if (under.path) {
					breadcrumd[basePath + under.path] = {
						icon: under.icon,
						name: under.name,
					}
					// 处理underMenu
					underMenu.push({
						icon: under.icon,
						name: under.name,
						path: basePath + under.path,
					})
				}
				if (under.routes) {
					under.routes.forEach(lastRoute => {
						if (lastRoute.path) {
							breadcrumd[basePath + under.path + lastRoute.path] = {
								icon: lastRoute.icon,
								name: lastRoute.name,
							}
						}
					})
				}
				if (underMenu.length !== 0) {
					menu.push({
						name: subMenu.name,
						icon: subMenu.icon,
						path: `${rootPath}${subMenu.path}`,
						routes: underMenu,
					})
					// 还需要处理面包屑
					breadcrumd[`${rootPath}${subMenu.path}`] = {
						name: subMenu.name,
						icon: subMenu.icon,
					}
				}
			})
		} else {
			menu.push({
				name: subMenu.name,
				icon: subMenu.icon,
				path: `${rootPath}${subMenu.path}`,
			})
			breadcrumd[`${rootPath}${subMenu.path}`] = {
				name: subMenu.name,
				icon: subMenu.icon,
			}
		}
	})
	return menu
}
export const recureiveMenu = routes => {
	const topMenu = []
	const sideMenu = []
	routes.forEach(route => {
		topMenu.push({
			name: route.name,
			path: route.path || "",
			icon: route.icon,
		})
		// console.log(topMenu)
		const path = route.path
		if (route.routes) {
			const sidebar = createMenu(path, route.routes)
			sideMenu[path] = sidebar
			breadcrumd[path] = {
				name: route.name,
				icon: route.icon,
			}
		}
	})
	console.log(sideMenu)
	return {
		topMenu,
		breadcrumd,
		sideMenu,
	}
}
