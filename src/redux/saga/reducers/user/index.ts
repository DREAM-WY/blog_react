import { loginAction } from "../../actions/user"

const initialStateSetter = {
	isLogin: false,
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
