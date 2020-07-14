import React from "react"
// import {setRetryTip} from "./redux/saga/actions/common";
import { useDispatch, useSelector } from "react-redux"
import Login from "././pages/login"
import "./index.less"

function App() {
	const dispatch = useDispatch()
	// const { retryTip } = useSelector((state: IState) => state.common)
	const handleClick = () => {
		dispatch({
			type: "TRIGGER",
			payload: [],
		})
	}
	return (
		<div className="App">
			<Login></Login>
		</div>
	)
}

export default App
