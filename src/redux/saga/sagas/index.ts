/*
 * @Author: wuyu
 * @Date: 2020-07-10 17:06:38
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-15 18:48:32
 * @Description: saga 的根root
 * @FilePath: /blog_react/src/redux/saga/sagas/index.ts
 */

//rootsaga

import { all, fork } from "redux-saga/effects"

import user from "./user/user"
const rootSaga = function* () {
	yield all([fork(user())])
}
export default rootSaga
