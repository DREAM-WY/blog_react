import React from "react"

import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "../pages/login"

import BlogLayout from "../layout"

// react写组件
export default function () {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={BlogLayout} />
				<Route path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	)
}
