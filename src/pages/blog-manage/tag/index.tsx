import React, { memo } from "react"
interface IProps {}
const Tag: React.FC<IProps> = props => {
	return (
		<div>
			标签
			<div>标签</div>
		</div>
	)
}
export default memo(Tag)
