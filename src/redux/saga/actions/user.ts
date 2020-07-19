/*
 * @Author: wuyu
 * @Date: 2020-07-11 09:11:23
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-15 18:16:35
 * @Description: login的action
 * @FilePath: /blog_react/src/redux/saga/actions/user.ts
 */
import { createRoutine, promisifyRoutine } from "redux-saga-routines"
import extendRoutine from "../extendRoutine"
import NAME_SPACE from "../../../constants/name-spce"

export const loginAction = extendRoutine(createRoutine(`${NAME_SPACE.USER}`), [
	{
		type: "LOG_OUT",
		action: "logOut",
	},
])

export const loginActionPromise = promisifyRoutine(loginAction)
