/*
 * @Author: wuyu
 * @Date: 2020-07-18 21:39:30
 * @LastEditors: wuyu
 * @LastEditTime: 2020-08-02 12:15:57
 * @Description: 面包屑组件
 * @FilePath: /blog_react/src/layout/components/breadcrumb/index.tsx
 */
import React, { memo } from "react"
import { useSelector } from "react-redux"
import { IRouteProps } from "../../layout"
import { CSSTransition } from "react-transition-group"
import { Breadcrumb, Divider } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
const { Item } = Breadcrumb
interface IProps extends IRouteProps {}
const BreadcrumbComponent: React.FC<IProps> = props => {
	const { breadcrumb, currentSiderBar } = useSelector((state: IState) => state.menu)

	if (currentSiderBar.length === 0) return null
	const {
		history,
		location: { pathname },
	} = props
	const pathSnipents = pathname.split("/").filter(i => i)
	const isShowBack = pathSnipents.length > 3 && history["length"] > 1
	return (
		<div className="breadcrumb">
			<CSSTransition
				in={isShowBack}
				timeout={400}
				classNames={{ enter: "animated fadeaInLeft faster", exit: "animated fadeaOutLeft faster" }}
				unmountOnExit>
				<>
					<LeftOutlined onClick={history["goBack"]} />
					<Divider type="vertical" />
				</>
			</CSSTransition>
			<Breadcrumb>
				{pathSnipents.map((item, index) => {
					const url = `/${pathSnipents.slice(0, index + 1).join("/")}`
					console.log(breadcrumb[url])
					const breadcrumbUrl = breadcrumb[url]
					return (
						<Item key={url}>
							{index > 1 && index !== pathSnipents.length - 1 ? (
								<Link to={url}>
									<span className="breadcrumb-icon">{breadcrumbUrl.icon}</span>
									{breadcrumbUrl.name}
								</Link>
							) : (
								<>
									<span className="breadcrumb-icon">{breadcrumbUrl.icon}</span>
									{breadcrumbUrl.name}
								</>
							)}
						</Item>
					)
				})}
			</Breadcrumb>
		</div>
	)
}
export default memo(BreadcrumbComponent)
