import React, { memo } from "react"
interface IProps {}
const NotFound: React.FC<IProps> = props => {
	return <div>404页面</div>
}
export default memo(NotFound)
