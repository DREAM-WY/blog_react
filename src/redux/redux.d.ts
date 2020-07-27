/*
 * @Author: wuyu
 * @Date: 2020-07-10 19:16:17
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-26 18:08:10
 * @Description: redux的j接口定义
 * @FilePath: /blog_react/src/redux/redux.d.ts
 */

interface ActionParams<T = any> {
	type: string
	payload: Object<T>
}
// 整个项目的状态树的接口树类型
interface IState {
	common: {
		retryTip: boolean
	}
	user: IUser
	menu: IMenu
}
