import React, { memo, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"

import { Menu, message } from "antd"
import { menuAction } from "../../../redux/saga/actions/menu"
import useActions from "../../../hooks/useActions"
import { RouteConfigComponentProps } from "react-router-config"
import { matchPath } from "react-router-dom"
import { MenuProps } from "antd/lib/menu"

interface IProps {
	history: RouteConfigComponentProps["history"]
	location: RouteConfigComponentProps["location"]
}
const { Item } = Menu

const TopMenu: React.FC<IProps> = props => {
	const { topMenu, sideMenu, currentTopMenu } = useSelector(
		(state: IState) => state.menu
	)
	const {
		history,
		location: { pathname },
	} = props
	const actions = useActions({
		setCurrentMenu: menuAction.setCurrentMenu,
	})
	console.log(currentTopMenu)
	const handleClick = useCallback(
		({ key }) => {
			actions.setCurrentMenu({
				currentTopMenu: key,
			})
			history.push(key)
		},
		[actions]
	)
	// 处理初始的逻辑
	useEffect(() => {
		if (
			!currentTopMenu ||
			pathname.split("/")[1] !== currentTopMenu.split("/")[1]
		) {
			// 就要去寻找选中的是哪一项
			let selectedMenu = topMenu.find(menu => {
				const matchedRoute = matchPath(pathname, {
					path: menu.path,
				})
				console.log(matchedRoute)
				return matchedRoute
			})
			if (pathname === "/") {
				if (topMenu && topMenu[0]) {
					actions.setCurrentMenu({
						currentTopMenu: topMenu[0].path,
					})
				}
			} else if (selectedMenu) {
				const path = selectedMenu?.path
				// 设置当前选中的项
				actions.setCurrentMenu({
					currentTopMenu: path,
				})
			} else {
				return history.push("/404")
			}
		}
	}, [actions, currentTopMenu, history, pathname, topMenu])

	// 默认选中的menu
	const propsValue: MenuProps = {
		mode: "horizontal",
	}
	if (currentTopMenu) {
		propsValue.selectedKeys = [currentTopMenu]
	}
	return (
		<div className="top-menu">
			<Menu {...propsValue} onClick={handleClick}>
				{topMenu.map(menu => (
					<Item key={menu.path} icon={menu.icon}>
						{menu.name}
					</Item>
				))}
			</Menu>
		</div>
	)
}
export default memo(TopMenu)
