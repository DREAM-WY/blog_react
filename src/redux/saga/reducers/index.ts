/*
 * @Author: wuyu
 * @Date: 2020-07-10 15:58:47
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-24 15:49:51
 * @Description:
 * @FilePath: /blog_react/src/redux/saga/reducers/index.ts
 */

// sagaReducer 的集合和导出

import common from "./common"
import user from "./user"
import menu from "./menu"

const sagaReducer = {
	common,
	user,
	menu,
}
export default sagaReducer
