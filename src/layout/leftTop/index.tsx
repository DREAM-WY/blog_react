/*
 * @Author: wuyu
 * @Date: 2020-07-23 15:46:37
 * @LastEditors: wuyu
 * @LastEditTime: 2020-08-09 00:05:04
 * @Description: left-top的布局
 * @FilePath: /blog_react/src/layout/leftTop/index.tsx
 */
import React, { memo, useMemo, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RouteConfigComponentProps } from "react-router-config"
import { Layout, Menu } from "antd"
import { CodepenOutlined } from "@ant-design/icons"
import { matchPath } from "react-router-dom"

const { Sider } = Layout
const { Item, SubMenu } = Menu
interface IProps {
	collapsed: boolean
	location: RouteConfigComponentProps["location"]
	history: RouteConfigComponentProps["history"]
}
// 递归的方法
const recursion = (currentSiderBar: any): any => {
	const root = currentSiderBar.map((menu: any) => {
		if (menu.routes) {
			return (
				<SubMenu key={menu.path} title={<span>{menu.name}</span>} icon={menu.icon}>
					{recursion(menu.routes)}
				</SubMenu>
			)
		} else {
			return (
				<Item key={menu.path} icon={menu.icon}>
					{menu.name}
				</Item>
			)
		}
	})
	return root
}
const LeftTopSidebar: React.FC<IProps> = props => {
	const {
		collapsed,
		history,
		location: { pathname },
	} = props
	const { currentSiderBar, currentTopMenu, theme, primaryColor } = useSelector((state: IState) => state.menu)
	console.log(theme, "theme")
	const [keys, setKeys] = useState<{
		currentOpenSubs: string[]
		currentSideMenu: string
	}>({
		currentOpenSubs: [],
		currentSideMenu: "",
	})

	const handleClickMenu = useCallback(
		({ key }) => {
			// 设置当前选中的对象
			console.log(key)

			history.push(key)
			setKeys({
				...keys,
				currentSideMenu: key,
			})
		},
		[history, keys]
	)
	const handleSubChange = useCallback(
		openKeys => {
			setKeys({
				...keys,
				currentOpenSubs: openKeys,
			})
		},
		[keys]
	)
	useEffect(() => {
		let currentSideMenu = ""
		let currentOpenSubs: string[] = []
		if (!keys.currentSideMenu || (currentTopMenu && !matchPath(pathname, { path: keys.currentSideMenu }))) {
			console.log(currentSiderBar)

			if (currentSiderBar && currentSiderBar.length !== 0) {
				// 如果当前的第0项有下级路由 设置为当前展开为下级的第0项
				if (currentSiderBar[0].routes) {
					currentOpenSubs = [currentSiderBar[0].path]
					currentSideMenu = currentSiderBar[0].routes[0].path
				} else {
					currentOpenSubs = []
					currentSideMenu = currentSiderBar[0].path
				}
			}
			// 优先匹配二级菜单
			const subMenu = currentSiderBar.find((sub: ISiderbarItem) => {
				const mathedRoute = matchPath(pathname, {
					path: sub.path,
				})
				return !!mathedRoute
			})
			if (subMenu) {
				if (subMenu.routes) {
					const { routes } = subMenu
					currentSideMenu = routes[0].path
					currentOpenSubs = [subMenu.path]
					// 匹配三级路由
					const selectSide: any = routes.find((sub: IMenuItem) => {
						const mathedRoute = matchPath(pathname, {
							path: sub.path,
						})
						return !!mathedRoute
					})
					if (selectSide) {
						// 判断还有没有四级路由
						if (selectSide.routes) {
							const { routes } = selectSide
							currentSideMenu = routes[0].path
							currentOpenSubs = [routes.path]
							const lastSide: any = routes.find((sub: IMenuItem) => {
								const mathedRoute = matchPath(pathname, {
									path: sub.path,
								})
								return !!mathedRoute
							})
							if (lastSide) {
								currentSideMenu = lastSide.path
							}
						} else {
							currentSideMenu = selectSide.path
						}
					}
				} else {
					currentSideMenu = subMenu.path
					currentOpenSubs = [subMenu.path]
				}
			}
			// 如果匹配失败
			if (
				!matchPath(pathname, {
					path: currentSideMenu,
				})
			) {
				history.push(currentSideMenu)
			}
			setKeys({
				currentSideMenu,
				currentOpenSubs,
			})
		}
	}, [currentSiderBar, currentTopMenu, keys.currentSideMenu, pathname])

	const style = useMemo(
		() => ({
			siderbar: {
				boxShadow: `1px 0 6px ${primaryColor}`,
				background: theme === "light" ? "#ffff" : primaryColor,
			},
			logoColor: {
				backgroundColor: theme === "light" ? "#fff" : primaryColor,
				color: theme !== "light" ? "#ffff" : primaryColor,
			},
		}),
		[primaryColor, theme]
	)
	if (currentSiderBar.length === 0) return null

	return (
		<Sider className="siderbar" trigger={null} collapsible collapsed={collapsed} style={style.siderbar}>
			<div className="logo" style={style.logoColor}>
				<CodepenOutlined style={style.logoColor} className="logo-icon" />
				<span className="logo-title" style={style.logoColor}>
					blog_react
				</span>
			</div>
			<Menu
				theme={theme}
				mode="inline"
				defaultSelectedKeys={["1"]}
				onClick={handleClickMenu}
				openKeys={keys.currentOpenSubs}
				selectedKeys={[keys.currentSideMenu]}
				onOpenChange={handleSubChange}>
				{/* {recursion(currentSiderBar)} 递归的写法 */}
				{currentSiderBar.map((menu: ISiderbarItem) => {
					if (menu.routes) {
						return (
							<SubMenu key={menu.path} title={<span>{menu.name}</span>} icon={menu.icon}>
								{/* 如果将来 咱们有需求，要添加多级路由*/}
								{menu.routes.map((menuItem: IMenuItem) => (
									<Item key={menuItem.path} icon={menuItem.icon}>
										{menuItem.name}
									</Item>
								))}
							</SubMenu>
						)
					} else {
						return (
							<Item key={menu.path} icon={menu.icon}>
								{menu.name}
							</Item>
						)
					}
				})}
			</Menu>
		</Sider>
	)
}
export default memo(LeftTopSidebar)
