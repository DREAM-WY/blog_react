import React, { memo } from "react"
import ContentMenu from "../../components/contextMenu"

interface IProps {}
const MorePages: React.FC<IProps> = props => {
	return (
		<div>
			<ContentMenu />
		</div>
	)
}
export default memo(MorePages)
