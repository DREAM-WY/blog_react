/*
 * @Author: wuyu
 * @Date: 2020-07-18 21:39:30
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-19 23:19:05
 * @Description: 返回一个对象里面有对登陆状态的操作
 * @FilePath: /blog_react/src/utils/loginUtils.ts
 */
import store from "../redux"
import localStore from "./localStore"
import { refreshToken } from "../http/user"
import { loginAction } from "../redux/saga/actions/user"

const tokenKey = "BLOG_JWT::token"
const tokenDate = "BLOG_JWT::date"
let isRefreshing: boolean = false
export default {
	saveLoginState(token: string) {
		// 保存登陆过后的信息
		localStore.set(tokenKey, token)
		// 过期事件设置为24小时
		localStore.set(tokenDate, new Date().getTime() + 1860000)
	},
	deleteLoginState() {
		// 退出登陆删除信息
		// 先从本地存储中删除数据
		store.dispatch(loginAction.logOut())
		localStore.remove(tokenKey)
		localStore.remove(tokenDate)
		// 处理页面
		if (window.location.pathname !== "/login") window.location.href = "/login"
	},
	getUserState() {
		// 获取用户信息
		const storeStaet = store.getState().user.isLogin
		if (storeStaet) return true
		const localToken = localStore.get(tokenKey)
		if (localToken) {
			store.dispatch(
				loginAction.success({
					token: localToken,
				})
			)
			return true
		}
	},
	// 获取token 刷新token 此方法会发起请求,说明是异步处理的 所以变成async方法
	async getToken() {
		// 处理异步执行
		// 过期前30分钟刷新
		if (isRefreshing) return localStorage.get(tokenKey)
		// 获取当前时间
		const now = new Date().getTime()
		// 获取过期时间
		const overdue = parseInt(localStorage.get(tokenDate) || "0", 10)
		try {
			if (now < overdue && now > overdue - 1800000) {
				isRefreshing = true
				const res: any = await refreshToken(localStorage.get(tokenKey) || "")
				const token: string = res.payload || ""
				this.saveLoginState(token)
				isRefreshing = false
				return token
			}
		} catch (error) {
			return localStorage.get(tokenKey)
		}
	},
}
