/*
 * @Author: wuyu
 * @Date: 2020-07-10 15:55:41
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-15 18:10:26
 * @Description:
 * @FilePath: /blog_react/src/redux/reducer.ts
 */

// 此文件夹只接受二个reducer  1个是sagaReducer 一个是thunkReducer

import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { History } from "history"
import sagaReducer from "./saga/reducers"
// import thunkReducer from "./thunk/reducers"

// combineReducers接受一个对象， 对象里面是一个一个的小的reducer
// const obj = {a: 1, B: 2}
const rootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		...sagaReducer,
	})

export default rootReducer
