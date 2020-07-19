/*
 * @Author: wuyu
 * @Date: 2020-07-10 17:11:15
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-15 15:30:57
 * @Description: 都十点
 * @FilePath: /blog_react/src/redux/saga/reducers/common/index.ts
 */

// 公共的reducer数据, 比如超时提示
import { setRetryTip } from "../../actions/common"

const initialeStateSstter = {
	retryTip: false,
}

export default (state = initialeStateSstter, action: ActionParams) => {
	switch (action.type) {
		// TRIGGER发起请求的时候

		//SUCCESS 成功的时候
		// FAILURE 失败的时候
		// FULFILL 完成的时候
		// REQUEST 一般不再这里使用
		case setRetryTip.TRIGGER: {
			return {
				...state,
				retryTip: true,
			}
		}
	}
	return state
}
