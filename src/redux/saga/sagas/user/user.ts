/*
 * @Author: wuyu
 * @Date: 2020-07-11 09:30:31
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-15 18:45:51
 * @Description: user模块
 * @FilePath: /blog_react/src/redux/saga/sagas/user/user.ts
 */

import { call, put, take, delay, takeEvery, cancel } from "redux-saga/effects"

import { loginAction } from "../../actions/user"
import { login } from "../../../../http/user"
function* authorize(action: ActionParams<ILogin>) {
	// 一进来就去调用后端的接口
	try {
		// call表示同步, 表示同步的方式做异步的事情
		const res = yield call(login, action.payload)
		// call 效果上表示同步的事情
		// 一般登陆成功后回获取一个token 一般进行本地存储 同时本次登陆过后 需要把token放入下次的请求头里面
		// 如果需要延迟
		yield delay(1000)
		yield put(loginAction.success(res))
	} catch (error) {
		// 错误处理
		yield put(loginAction.failure())
	}
}

export default () =>
	function* () {
		// 在这里面进行effect 处理 （副作用的处理 一般是指异步请求）
		const task = yield takeEvery(loginAction.TRIGGER, authorize)
		// 监听两个type 一个是主动退出，一个是登录出错
		const action = yield take([loginAction.LOG_OUT, loginAction.FAILURE])

		// 就可以手动去取消本次请求
		if (action.type === loginAction.LOG_OUT) yield cancel(task)
	}
