/*
 * @Author: wuyu
 * @Date: 2020-07-19 10:43:17
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-19 23:18:52
 * @Description: 路由鉴权文件
 * @FilePath: /blog_react/src/router/Auth.tsx
 */
import React, { memo } from "react"
import { Redirect } from "react-router-dom"

import { Alert, Button } from "antd"
import { useSelector } from "react-redux"
import loginUtils from "../utils/loginUtils"
import { renderRoutes, RouteConfigComponentProps } from "react-router-config"

interface IProps extends RouteConfigComponentProps {}
const Auth: React.FC<IProps> = props => {
	const { retryTip } = useSelector((state: IState) => state.common)
	const isLogin = loginUtils.getUserState()
	const { route, location } = props
	console.log(props, isLogin)
	const GlobalTip = retryTip ? (
		<Alert
			className="golbal-tip"
			type="error"
			message={
				<p>
					请求数据多次超时,可能用影响后面的操作,请检查网络后操作
					<Button type="link" onClick={() => window.location.reload()}>
						刷新页面
					</Button>
					!!!
				</p>
			}
			showIcon={false}
			closable
			banner
		/>
	) : null
	console.log(isLogin, location, retryTip)
	if (!isLogin && location.pathname !== "/login") {
		return <Redirect to="/login" />
	}
	if (isLogin && location.pathname === "/login") return <Redirect to="/" />
	return (
		<>
			{GlobalTip}
			{route && route.routes && renderRoutes(route.routes)}
		</>
	)
}
export default memo(Auth)
