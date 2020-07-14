import React, { memo } from "react"
import { Form, Button, Input } from "antd"

interface IProps {
	loading: boolean
}
const LoginMain: React.FC<IProps> = props => {
	const { Item } = Form
	const { loading } = props
	return (
		<div className="login-laylod-main">
			<div className="login-laylod-main-form">
				<h2 className="login-laylod-main-title">欢迎登陆react_blog</h2>
				<Form className="login-laylod-main-form-box">
					<Item>
						<Input placeholder="请输入用户名" />
					</Item>
					<Item>
						<Input placeholder="请输入密码" type="password" />
					</Item>
					<Item>
						<Button
							className="login-laylod-main-form_button"
							loading={loading}
							type="primary">
							登陆
						</Button>
					</Item>
				</Form>
			</div>
		</div>
	)
}
export default memo(LoginMain)
