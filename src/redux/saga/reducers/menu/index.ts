/*
 * @Author: wuyu
 * @Date: 2020-07-24 15:40:47
 * @LastEditors: wuyu
 * @LastEditTime: 2020-08-08 14:15:26
 * @Description: 处理menu数据
 * @FilePath: /blog_react/src/redux/saga/reducers/menu/index.ts
 */
import { menuAction } from "../../actions/menu"
import { recursiveMenu } from "./utils"
import localStore from "../../../../utils/localStore"
const initialStateSetter: IMenu = {
	breadcrumb: {},
	topMenu: [],
	sideMenu: {},
	currentSiderBar: [],
	currentTopMenu: null,
	theme: localStore.get("theme") || "dark",
	primaryColor: localStore.get("primary-color") || "#d214a2",
	drawer: false,
}
export default (state = initialStateSetter, action: ActionParams) => {
	switch (action.type) {
		case menuAction.SET_MENU: {
			const { routes } = action.payload
			const { topMenu, sideMenu, breadcrumb } = recursiveMenu(routes)
			return {
				...state,
				topMenu,
				sideMenu,
				breadcrumb,
			}
		}
		case menuAction.SET_CURRENt_MENU: {
			return {
				...state,
				...action.payload,
				currentSiderBar: state.sideMenu[action.payload.currentTopMenu] || [],
			}
		}
		case menuAction.SET_DRAWER: {
			return {
				...state,
				drawer: action.payload,
			}
		}
		case menuAction.SET_THEME: {
			localStore.set("theme", action.payload)
			return {
				...state,
				theme: action.payload,
			}
		}
		case menuAction.SET_PRIMARY: {
			localStore.set("primary-color", action.payload)
			return {
				...state,
				primaryColor: action.payload,
			}
		}
		default:
			return state
	}
}
