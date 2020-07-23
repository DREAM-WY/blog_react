import React, { memo, useCallback, useState } from "react"
import PickerColor from "../../../components/pickColor"
import UserInfo from "./UserInfo"

import "./index.less"
interface IProps {}
const RightMenu: React.FC<IProps> = props => {
	const onChangeComplete = useCallback(color => {
		console.log(color)
	}, [])
	return (
		<div className="right-menu">
			<PickerColor themColor="#ce13a0" onChangeComplete={onChangeComplete} />
			<div className="language">简体中文</div>
			<UserInfo />
		</div>
	)
}
export default memo(RightMenu)
