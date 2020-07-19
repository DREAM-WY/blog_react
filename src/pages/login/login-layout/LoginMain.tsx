import React, { memo } from "react"
import { Form, Button, Input, notification } from "antd"

interface IProps {
	fetch: (values: ILogin) => Promise<any>
	loading: boolean
}
const LoginMain: React.FC<IProps> = props => {
	const { Item } = Form
	const { loading, fetch } = props
	// values是表单数据的集合
	const handleLogin = (values: any) => {
		console.log(values)
		if (!values.username || !values.password) {
			notification.warn({
				message: "验证失败",
				description: "用户名或密码错误!",
			})
		} else {
			// 用户名密码校验通过 执行登陆
			try {
				fetch({
					username: values.username,
					password: values.password,
				}).then(
					res => {
						console.log(res)
					},
					err => {
						console.log(err)
					}
				)
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<div className="login-laylod-main">
			<div className="login-laylod-main-form">
				<h2 className="login-laylod-main-title">欢迎登陆react_blog</h2>
				<Form
					className="login-laylod-main-form-box"
					onFinish={handleLogin}
					// initialValues 初始值
					initialValues={{ username: "wuyu" }}>
					<Item name="username">
						<Input placeholder="请输入用户名" />
					</Item>
					<Item name="password">
						<Input placeholder="请输入密码" type="password" />
					</Item>
					<Item>
						<Button
							className="login-laylod-main-form_button"
							loading={loading}
							type="primary"
							htmlType="submit">
							登陆
						</Button>
					</Item>
				</Form>
			</div>
		</div>
	)
}
export default memo(LoginMain)
