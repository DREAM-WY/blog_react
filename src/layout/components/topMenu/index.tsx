import React, { memo } from "react"
import { Menu } from "antd"

interface IProps {}
const { Item } = Menu
const TopMenu: React.FC<IProps> = props => {
	return (
		<div className="top-menu">
			<Menu mode="horizontal">
				<Item>工作台</Item>
				<Item>产品管理</Item>
				<Item>采购管理</Item>
				<Item>仓储物流管理</Item>
				<Item>运营管理</Item>
				<Item>个人中心</Item>
			</Menu>
		</div>
	)
}
export default memo(TopMenu)
