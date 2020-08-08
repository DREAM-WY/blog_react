import React, { memo, useState, useEffect, useCallback } from "react"
import useActions from "../hooks/useActions"
import { useSelector } from "react-redux"
import "./index.less"
import { Layout, Spin, Drawer, Form, Radio, Button } from "antd"
import TopMenu from "./components/topMenu"
import RightMenu from "./components/rightMenu"
import LeftTop from "./leftTop"
import { menuAction } from "../redux/saga/actions/menu"
import BreadcrumbComponent from "./components/breadcrumb"

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { RouteConfigComponentProps, renderRoutes } from "react-router-config"
const { Header, Content } = Layout
const { Group } = Radio
const { Item } = Form
interface IProps extends RouteConfigComponentProps {}
const BlogLayout: React.FC<IProps> = props => {
	const { route, history, location } = props
	const { topMenu, currentSiderBar, theme, drawer, primaryColor } = useSelector((state: IState) => state.menu)
	const [collapsed, setCollapsed] = useState(false)
	const actions = useActions({
		setMenu: menuAction.setMenu,
		setDrawer: menuAction.setDrawer,
		setTheme: menuAction.setTheme,
	})
	const handleSettingClick = useCallback(values => {
		actions.setTheme(values.theme)
	}, [])
	useEffect(() => {
		if (route) {
			actions.setMenu({ routes: route?.routes })
		}
	}, [])
	if (topMenu.length === 0) return <Spin />
	const toggle = () => {
		setCollapsed(!collapsed)
	}
	const handleClose = () => {
		// 关闭系统设置
		console.log("关闭")
		actions.setDrawer(false)
	}

	return (
		<Layout className="layout">
			<LeftTop collapsed={collapsed} history={history} location={location} />
			<Layout className="layout-header">
				<Header className="layout-header-background" style={{ padding: 0 }}>
					<div className="layout-header-top">
						{currentSiderBar.length !== 0 && (
							<div className="trigger" style={{ color: primaryColor }}>
								{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
									onClick: toggle,
								})}
							</div>
						)}

						<div className="layout-header-top-menu">
							<TopMenu history={history} location={location} />
						</div>
						<div className="layout-header-top-roght">
							<RightMenu />
						</div>
					</div>
					<Drawer width={360} visible={drawer} onClose={handleClose}>
						<Form onFinish={handleSettingClick} initialValues={{ theme: theme }}>
							<Item label="导航主题" name="theme">
								<Group value="dark">
									<Radio value="dark">dark-暗色系</Radio>
									<Radio value="light">light-亮色系</Radio>
								</Group>
							</Item>
							<Item>
								<Button style={{ marginRight: "20px" }}>恢复系统设置</Button>
								<Button type="primary" htmlType="submit">
									保存
								</Button>
							</Item>
						</Form>
					</Drawer>
				</Header>
				<Content className="layout-content">
					<BreadcrumbComponent history={history} location={location} />
					{renderRoutes(route?.routes)}
				</Content>
			</Layout>
		</Layout>
	)
}
export default memo(BlogLayout)
