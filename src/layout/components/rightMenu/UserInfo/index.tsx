import React, { memo, useCallback } from "react"
import { Badge, Avatar, Dropdown, Menu, message } from "antd"
import { CaretDownOutlined } from "@ant-design/icons"
import { menuAction } from "../../../../redux/saga/actions/menu"
import useActions from "../../../../hooks/useActions"
interface IProps {}
const UserInfo: React.FC<IProps> = props => {
	const action = useActions({
		setDrawer: menuAction.setDrawer,
	})
	const handleSittingDrawer = useCallback(() => {
		action.setDrawer(true)
	}, [])
	const { Item } = Menu
	const UserMenu = (
		<Menu>
			<Item onClick={() => message.info("你点击了修改密码")}>修改密码</Item>
			<Item onClick={handleSittingDrawer}>系统设置</Item>
			<Item onClick={() => message.info("你点击了清除缓存")}>清除缓存</Item>
			<Item onClick={() => message.info("你点击了退出登录")}>退出登录</Item>
		</Menu>
	)
	return (
		<div className="user">
			<Badge overflowCount={99} count={199} title="你有199条信息">
				<Avatar size="small">WY</Avatar>
			</Badge>
			<Dropdown overlay={UserMenu} trigger={["hover"]}>
				<span className="name ">
					超级管理员
					<CaretDownOutlined />
				</span>
			</Dropdown>
		</div>
	)
}
export default memo(UserInfo)
