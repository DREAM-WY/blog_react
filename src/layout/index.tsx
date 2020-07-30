import React, { memo, useState, useEffect } from "react"
import useActions from "../hooks/useActions"
import { useSelector } from "react-redux"
import "./index.less"
import { Layout, Spin } from "antd"
import TopMenu from "./components/topMenu"
import RightMenu from "./components/rightMenu"
import LeftTop from "./leftTop"
import { menuAction } from "../redux/saga/actions/menu"

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { RouteConfigComponentProps } from "react-router-config"
const { Header, Content } = Layout

interface IProps extends RouteConfigComponentProps {}
const BlogLayout: React.FC<IProps> = props => {
	const { route, history, location } = props
	const { topMenu } = useSelector((state: IState) => state.menu)
	const [collapsed, setCollapsed] = useState(false)
	const actions = useActions({
		setMenu: menuAction.setMenu,
	})
	useEffect(() => {
		if (route) {
			actions.setMenu({ routes: route?.routes })
		}
	}, [])
	if (topMenu.length === 0) return <Spin />
	const toggle = () => {
		setCollapsed(!collapsed)
	}
	return (
		<Layout className="layout">
			<LeftTop collapsed={false} history={history} location={location} />
			<Layout className="layout-header">
				<Header className="layout-header-background" style={{ padding: 0 }}>
					<div className="layout-header-top">
						<div className="trigger">
							{React.createElement(
								collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
								{
									onClick: toggle,
								}
							)}
						</div>
						<div className="layout-header-top-menu">
							<TopMenu history={history} location={location} />
						</div>
						<div className="layout-header-top-roght">
							<RightMenu />
						</div>
					</div>
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
					}}>
					Content
				</Content>
			</Layout>
		</Layout>
	)
}
export default memo(BlogLayout)
