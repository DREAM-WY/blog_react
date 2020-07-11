// 此文件夹只接受二个reducer  1个是sagaReducer 一个是thunkReducer

import { combineReducers } from "redux"
import sagaReducer from "./saga/reducers"

const rootReducer = combineReducers({
	...sagaReducer,
})

export default rootReducer
