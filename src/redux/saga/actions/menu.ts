/*
 * @Author: wuyu
 * @Date: 2020-07-24 15:23:04
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-27 16:39:15
 * @Description: menu的action
 * @FilePath: /blog_react/src/redux/saga/actions/menu.ts
 */
import { createRoutine, promisifyRoutine } from "redux-saga-routines"
import extendRoutine from "../extendRoutine"
import NAME_SPACE from "../../../constants/name-spce"

export const menuAction = extendRoutine(createRoutine(`${NAME_SPACE.MENU}`), [
	{
		type: "SET_MENU",
		action: "setMenu",
	},
	{
		type: "SET_CURRENt_MENU",
		action: "setCurrentMenu",
	},
])

export const menuActionPromise = promisifyRoutine(menuAction)
