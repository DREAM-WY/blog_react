/*
 * @Author: wuyu
 * @Date: 2020-07-19 10:48:14
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-19 10:50:41
 * @Description: 工作台组件
 * @FilePath: /blog_react/src/pages/dashboard /index.tsx
 */
import React, { memo } from "react"
interface IProps {}
const Dashboard: React.FC<IProps> = props => {
	return (
		<div>
			工作台组件
			<div>米娜半</div>
		</div>
	)
}
export default memo(Dashboard)
