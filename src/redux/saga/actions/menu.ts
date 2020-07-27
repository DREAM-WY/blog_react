/*
 * @Author: wuyu
 * @Date: 2020-07-24 15:23:04
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-24 15:29:30
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
])

export const menuActionPromise = promisifyRoutine(menuAction)
