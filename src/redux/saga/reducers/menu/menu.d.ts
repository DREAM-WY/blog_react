/*
 * @Author: wuyu
 * @Date: 2020-07-26 17:43:30
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-28 22:26:31
 * @Description: menu 的接口
 * @FilePath: /blog_react/src/redux/saga/reducers/menu/menu.d.ts
 */
interface IMenu {
	breadcrumb: {
		[key: string]: {
			icon: React.ReactNode
			name: string
		}
	}
	topMenu: Array<IMenuItem>
	sideMenu: {
		[key: string]: ISiderbar
	}
	currentSiderBar: ISiderbar
	currentTopMenu: string | null
}

type IMenuItem = {
	name: string
	path: string
	icon?: React.ReactNode
}
type ISiderbar = Array<ISiderbarItem>
type ISiderbarItem = {
	name: string
	path: string
	icon?: React.ReactNode
	routes?: Array<IMenuItem>
}
