/*
 * @Author: wuyu
 * @Date: 2020-07-12 22:41:19
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-18 11:28:51
 * @Description: 登陆组件
 * @FilePath: /blog_react/src/pages/login/index.tsx
 */
import React, { memo } from "react"
import { Redirect } from "react-router-dom"
import ParticlesBg from "particles-bg"
import LoginMain from "./login-layout/LoginMain"
import { useSelector } from "react-redux"
import { loginActionPromise } from "../../redux/saga/actions/user"
import useActions from "../../hooks/useActions"
import "./index.less"
interface IProps {}

const Login: React.FC<IProps> = props => {
	const { loading, isLogin } = useSelector((state: IState) => state.user)
	const actions = useActions({ loginActionPromise })
	if (isLogin) return <Redirect to="/" />
	return (
		<div className="login">
			<div className="login-laylod">
				<div className="login-laylod-header"></div>
				<LoginMain loading={loading} fetch={actions.loginActionPromise} />
				<div className="login-laylod-footer"></div>
				<div className="login-laylod-bg">
					<ParticlesBg type="lines" bg={true} />
				</div>
			</div>
		</div>
	)
}

export default memo(Login)
