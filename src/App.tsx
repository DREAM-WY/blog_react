import React from "react"
import {Button} from "antd"
import {setRetryTip} from "./redux/saga/actions/common";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch()
    const {retryTip} = useSelector((state: IState) => state.common)
    const handleClick = () => {
        dispatch({
            type: 'TRIGGER',
            payload: []
        })
    }
    return (
        <div className="App">
            <Button type="primary" onClick={handleClick}>测试</Button>
        </div>
    )
}

export default App
