/*
 * @Author: wuyu
 * @Date: 2020-07-11 09:18:45
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-14 10:34:00
 * @Description: 登陆的各种type操作
 * @FilePath: /blog_react/src/redux/saga/reducers/user/index.ts
 */

import { loginAction } from "../../actions/user"

const initialStateSetter: IUser = {
	isLogin: false,
	loading: false,
}
export default function (state = initialStateSetter, action: ActionParams) {
	switch (action.type) {
		case loginAction.SUCCESS: {
			return {
				...state,
				isLogin: true,
			}
		}
		case loginAction.FAILURE: {
			console.log("出错了")
			return {
				...state,
			}
		}
		default:
			return state
			break
	}
}
