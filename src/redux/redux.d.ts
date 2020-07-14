/*
 * @Author: wuyu
 * @Date: 2020-07-10 19:16:17
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-14 10:10:25
 * @Description: redux的j接口定义
 * @FilePath: /blog_react/src/redux/redux.d.ts
 */

interface ActionParams<T = any> {
	type: string
	payload: Object<T>
}
interface IState {
	common: any
	user: IUser
}
