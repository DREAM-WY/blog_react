import React, { memo } from "react"
import { LoadingComponentProps } from "react-loadable"
import { Spin, Result, Button } from "antd"

interface IProps {}
const PageLoading: React.FC<LoadingComponentProps> = props => {
	console.log(props)
	const { error, isLoading, timedOut, pastDelay } = props
	if (isLoading && pastDelay) return <Spin className="spin-contenr" />
	if (timedOut || error) {
		return (
			<Result
				status="error"
				title="组件加载失败"
				subTitle="有可能当前正在发布新版,或者您的网络出现了问题,请重试,如果多次重试失败,请联系管理员!!!"
				extra={
					<Button onClick={() => window.location.reload()} type="primary">
						重试
					</Button>
				}
			/>
		)
	}
	return <div>加载中</div>
}
export default memo(PageLoading)
