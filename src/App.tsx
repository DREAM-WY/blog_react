import React from "react"
// import {setRetryTip} from "./redux/saga/actions/common";
import { useDispatch, useSelector } from "react-redux"

import Login from "././pages/login"
import "./index.less"
import routes from "./router"
import { History } from "history"

import { ConnectedRouter } from "connected-react-router"
interface IApp {
	history: History
}
function App({ history }: IApp) {
	return <ConnectedRouter history={history}>{routes}</ConnectedRouter>
}

export default App
