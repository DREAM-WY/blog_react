import React, { memo, useMemo, useState, useCallback } from "react"
import { SketchPicker, ChromePicker } from "react-color"
import { Popover } from "antd"

import "./index.less"

interface IProps {
	themColor: string
	onChangeComplete: (color: string) => void
	type?: string
	position?: string
}
const pickers: {
	[key: string]: React.ReactNode
} = {
	chrome: ChromePicker,
	sketch: SketchPicker,
}

const PickerColor: React.FC<IProps> = props => {
	const {
		type = "sketch",
		position = "bottom",
		themColor,
		onChangeComplete,
	} = props
	const [displayColorPicker, setDisplayColorPicker] = useState(false)
	const [color, serColor] = useState(themColor)
	const Picker: any = pickers[type]

	const handleChange = () => {
		// 颜色选择的函数
	}
	const handleChangeComplete = (color: any) => {
		// 颜色选择的函数
		onChangeComplete(color.hex)
		serColor(color.hex)
	}
	const headleClick = useCallback(() => {
		// 点击显示色块
		setDisplayColorPicker(!displayColorPicker)
	}, [displayColorPicker])
	const handleClosepicker = useCallback(() => {
		// 关闭颜色选择
		setDisplayColorPicker(false)
	}, [displayColorPicker])

	const { picker, swatch } = useMemo(() => {
		const styles: any = {
			wrapper: {
				position: "inherit",
				zIndex: 100,
			},
		}
		if (position === "top") {
			styles.wrapper.transform = "translateY(-100%)"
			styles.wrapper.paddingBottom = 8
		}
		const swatch = (
			<Popover content="更换主题色">
				<div className="swatch" onClick={headleClick}>
					<div className="swatch-color" style={{ background: color }} />
				</div>
			</Popover>
		)
		const picker = displayColorPicker ? (
			<div className="popover">
				<div className="cover" onClick={handleClosepicker} />
				<div style={styles.wrapper}>
					<Picker
						onChange={handleChange}
						onChangeComplete={handleChangeComplete}
					/>
				</div>
			</div>
		) : null
		return {
			picker,
			swatch,
		}
	}, [position, displayColorPicker, color, handleChangeComplete])

	return (
		<div className="pick-color">
			{swatch}
			{picker}
		</div>
	)
}
export default memo(PickerColor)
