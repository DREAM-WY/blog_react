import React, { memo, useEffect, useCallback } from "react"
import { Menu } from "antd"
import {
	ReloadOutlined,
	CloseOutlined,
	CloseCircleOutlined,
	CloseSquareOutlined,
	VerticalLeftOutlined,
	VerticalRightOutlined,
	SyncOutlined,
} from "@ant-design/icons"

import "./index.less"
interface IProps {}
const ContextMenu: React.FC<IProps> = props => {
	const hideRightContent = useCallback(key => {
		console.log(key)
	}, [])
	useEffect(() => {
		document.addEventListener("click", hideRightContent)
		return () => {
			document.removeEventListener("click", hideRightContent)
		}
	}, [hideRightContent])
	return (
		<div className="contextMenu">
			<div className="content">
				<Menu onClick={({ key }) => hideRightContent(key)}>
					<Menu.Item key="refresh" icon={<ReloadOutlined />}>
						刷新
					</Menu.Item>
					<Menu.Item icon={<SyncOutlined />}>刷新全部</Menu.Item>
					<Menu.Item icon={<CloseOutlined />}>关闭</Menu.Item>
					<Menu.Item icon={<CloseCircleOutlined />}>关闭其他</Menu.Item>
					<Menu.Item icon={<CloseSquareOutlined />}>关闭全部</Menu.Item>
					<Menu.Item icon={<VerticalLeftOutlined />}>关闭左侧</Menu.Item>
					<Menu.Item icon={<VerticalRightOutlined />}>关闭右侧</Menu.Item>
				</Menu>
			</div>
		</div>
	)
}
export default memo(ContextMenu)
