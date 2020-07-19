/*
 * @Author: wuyu
 * @Date: 2020-07-11 09:18:45
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-18 11:31:19
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
		case loginAction.TRIGGER: {
			return {
				...state,
				loading: true,
			}
		}
		case loginAction.SUCCESS: {
			return {
				...state,
				isLogin: true,
			}
		}
		case loginAction.FAILURE: {
			return {
				...state,
				loading: false,
			}
		}
		case loginAction.FULFILL: {
			return {
				...state,
				loading: false,
			}
		}
		default:
			return state
			break
	}
}
