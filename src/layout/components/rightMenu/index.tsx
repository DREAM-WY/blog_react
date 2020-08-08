import React, { memo, useCallback, useState, useEffect } from "react"
import PickerColor from "../../../components/pickColor"
import UserInfo from "./UserInfo"
import { useSelector } from "react-redux"
import useActions from "../../../hooks/useActions"
import { menuAction } from "../../../redux/saga/actions/menu"
import localStore from "../../../utils/localStore"
import "./index.less"
interface IProps {}
// 在线还皮肤借助于window.less这个属性
const ROUTE_BASE_NAME = process.env.PUBLIC_URL || ""
const BASE_NAME = ROUTE_BASE_NAME ? ROUTE_BASE_NAME.replace("/", "") : ""
const OLD_LESS_ID = `less:${BASE_NAME ? BASE_NAME + "_" : ""}color:old`
const LESS_ID = `less:${BASE_NAME ? BASE_NAME + "_" : ""}color`
// less.min.js 是antd的样式表
const LESS_URL = `${ROUTE_BASE_NAME}/less.min.js`
function loadScript(src: string) {
	return new Promise((resolve, reject) => {
		const scritp = document.createElement("script")
		scritp.type = "text/javascript"
		scritp.src = src
		scritp.onload = resolve
		scritp.onerror = reject
		document.head.appendChild(scritp)
	})
}
const RightMenu: React.FC<IProps> = props => {
	const [lessLoaded, setLessLoaded] = useState(false)
	const { primaryColor } = useSelector((state: IState) => state.menu)
	const actions = useActions({
		setPrimary: menuAction.setPrimary,
	})
	const onChangeComplete = useCallback(
		color => {
			console.log(color)
			actions.setPrimary(color)

			const changeColor = () => {
				window["less"]
					.modifyVars({
						"@primary-color": color,
					})
					.then(() => {
						// 清除缓存的样式
						const oldStyle = document.getElementById(OLD_LESS_ID)
						oldStyle?.remove()
						const lessColor = document.getElementById(LESS_ID)
						// 由于页面的css是异步加载来的
						lessColor && document.body.insertBefore(lessColor, document.body.firstChild)
						localStore.set("theme-style-content", lessColor?.innerHTML)
					})
			}
			if (lessLoaded) {
				changeColor()
			} else {
				window["less"] = {
					logLevel: 2,
					async: true,
					javascriptEnabled: true,
					modifyVars: {
						"@primary-color": "#d214a2",
					},
				}
				loadScript(LESS_URL).then(() => {
					setLessLoaded(true)
					changeColor()
				})
			}
		},
		[actions, lessLoaded]
	)
	useEffect(() => {
		const themeStyleContent = localStore.get("theme-style-content")
		if (themeStyleContent) {
			const themeStyle = document.createElement("style")
			themeStyle.id = OLD_LESS_ID
			themeStyle.innerHTML = themeStyleContent
			document.body.insertBefore(themeStyle, document.body.firstChild)
			// .less 生成以后 就要生成主题了
			if (primaryColor) onChangeComplete(primaryColor)
		}
	}, [])
	const themeColor: string = primaryColor
	return (
		<div className="right-menu">
			<PickerColor themeColor={themeColor} onChangeComplete={onChangeComplete} type="sketch" />
			<div className="language">简体中文</div>
			<UserInfo />
		</div>
	)
}
export default memo(RightMenu)
