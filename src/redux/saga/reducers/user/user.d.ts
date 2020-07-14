/*
 * @Author: wuyu
 * @Date: 2020-07-11 09:18:55
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-14 10:32:12
 * @Description: 登陆的接口
 * @FilePath: /blog_react/src/redux/saga/reducers/user/user.d.ts
 */

interface ILogin {
	username: string
	password: string
}
interface IUser {
	loading: boolean
	isLogin: boolean
}
