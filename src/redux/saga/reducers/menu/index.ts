/*
 * @Author: wuyu
 * @Date: 2020-07-24 15:40:47
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-30 23:34:20
 * @Description: 处理menu数据
 * @FilePath: /blog_react/src/redux/saga/reducers/menu/index.ts
 */
import { menuAction } from "../../actions/menu"
import { recureiveMenu } from "./utils"

const initialStateSetter: IMenu = {
	breadcrumb: {},
	topMenu: [],
	sideMenu: {},
	currentSiderBar: [],
	currentTopMenu: null,
}
export default (state = initialStateSetter, action: ActionParams) => {
	switch (action.type) {
		case menuAction.SET_MENU: {
			const { routes } = action.payload
			const { topMenu, sideMenu, breadcrumd } = recureiveMenu(routes)
			return {
				...state,
				topMenu,
				sideMenu,
				breadcrumd,
			}
		}
		case menuAction.SET_CURRENt_MENU: {
			console.log(action.payload, "123")
			console.log(state.sideMenu)
			return {
				...state,
				...action.payload,
				currentSiderBar: state.sideMenu[action.payload.currentTopMenu] || [],
			}
		}
		default:
			return state
	}
}