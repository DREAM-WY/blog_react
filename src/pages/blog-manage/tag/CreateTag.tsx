import React, { memo } from "react"
interface IProps {}
const CreateTag: React.FC<IProps> = props => {
	return (
		<div>
			新建标签页
			<div>新建</div>
		</div>
	)
}
export default memo(CreateTag)
