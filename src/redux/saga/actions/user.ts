/*
 * @Author: wuyu
 * @Date: 2020-07-11 09:11:23
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-14 10:19:05
 * @Description: login的action
 * @FilePath: /blog_react/src/redux/saga/actions/user.ts
 */

import { createRoutine, promisifyRoutine } from "redux-saga-routines"
import extendRoutine from "../extendRoutine"
import NAME_SPCE from "../../../constants/name-spce/index"

export const loginAction = extendRoutine(createRoutine(`${NAME_SPCE.USER}`), [
	{
		type: "LOG_OUT",
		action: "logOut",
	},
])
export const loginActionPrpmise = promisifyRoutine(loginAction)
