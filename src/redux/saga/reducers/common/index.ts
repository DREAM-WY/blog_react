// 公共的reducer数据, 比如超时提示
import {setRetryTip} from "../../actions/common";

const initialeStateSstter = {}

export default (state = initialeStateSstter, action: ActionParams) => {
	switch (action.type ) {
		// TRIGGER发起请求的时候

		//SUCCESS 成功的时候
		// FAILURE 失败的时候
		// FULFILL 完成的时候
		// REQUEST 一般不再这里使用
		case setRetryTip.TRIGGER: {
			return {
				...state,
				retryTip: true
			}
		}
	}
	return state
}
