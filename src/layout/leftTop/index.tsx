/*
 * @Author: wuyu
 * @Date: 2020-07-23 15:46:37
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-26 12:13:08
 * @Description: left-top的布局
 * @FilePath: /blog_react/src/layout/leftTop/index.tsx
 */
import React, { memo } from "react"
import { Layout, Menu } from "antd"
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	CodepenOutlined,
} from "@ant-design/icons"
const { Sider } = Layout
const { Item, SubMenu } = Menu
interface IProps {
	collapsed: boolean
}
const LeftTopSidebar: React.FC<IProps> = props => {
	const { collapsed } = props
	return (
		<Sider
			className="siderbar"
			trigger={null}
			collapsible
			collapsed={collapsed}>
			<div className="logo">
				<CodepenOutlined className="logo-icon" />
				<span className="logo-title">blog_react</span>
			</div>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
				<SubMenu title="submenu">
					<Item key="menu1" icon={<UserOutlined />}>
						menu1
					</Item>
					<Item key="menu2" icon={<VideoCameraOutlined />}>
						menu2
					</Item>
					<Item key="menu3" icon={<UploadOutlined />}>
						menu3
					</Item>
				</SubMenu>
				<SubMenu title="submenu1">
					<Item key="menu1" icon={<UserOutlined />}>
						menu1
					</Item>
					<Item key="menu2" icon={<VideoCameraOutlined />}>
						menu2
					</Item>
					<Item key="menu3" icon={<UploadOutlined />}>
						menu3
					</Item>
				</SubMenu>
				<SubMenu title="submenu2">
					<Item key="menu1" icon={<UserOutlined />}>
						menu1
					</Item>
					<Item key="menu2" icon={<VideoCameraOutlined />}>
						menu2
					</Item>
					<Item key="menu3" icon={<UploadOutlined />}>
						menu3
					</Item>
				</SubMenu>
				<Menu.Item key="1" icon={<UserOutlined />}>
					nav 1
				</Menu.Item>
				<Menu.Item key="2" icon={<VideoCameraOutlined />}>
					nav 2
				</Menu.Item>
				<Menu.Item key="3" icon={<UploadOutlined />}>
					nav 3
				</Menu.Item>
			</Menu>
		</Sider>
	)
}
export default memo(LeftTopSidebar)
