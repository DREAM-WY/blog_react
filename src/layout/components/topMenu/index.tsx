import React, { memo, useCallback } from "react"
import { useSelector } from "react-redux"

import { Menu, message } from "antd"

interface IProps {}
const { Item } = Menu
const TopMenu: React.FC<IProps> = props => {
	const { topMenu, sideMenu } = useSelector((state: IState) => state.menu)
	console.log(topMenu, sideMenu)
	const handleClick = useCallback(() => {
		message.success("sss")
	}, [])
	return (
		<div className="top-menu">
			<Menu mode="horizontal" onClick={handleClick}>
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
