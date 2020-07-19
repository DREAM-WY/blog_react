import React from "react"
import Auth from "./Auth"
import Dashboard from "../pages/dashboard"
import Login from "../pages/login"
import BlogLayout from "../layout"
import RouteWithSubRouters from "./RouteWithSubRouters"
import blog from "./config/blog"
import person from "./config/person"
import {
	DiffOutlined,
	BoldOutlined,
	DashboardOutlined,
} from "@ant-design/icons"

export default [
	{
		// 顶级路由 是一个单纯的路基组件，没有任何icon name这些和路由导航相关的东西
		// 路由鉴权 不管什么情况，都是需要走这个组件的 都是必须先过这个组件的关卡

		component: Auth,
		routes: [
			{
				// 1级级路由
				component: Login,
				path: "/login",
			},
			{
				path: "/",
				component: BlogLayout,
				routes: [
					{
						// 1级级路由
						component: Dashboard,
						icon: <DashboardOutlined />,
						name: "工作台",
						path: "/dashboard",
					},
					// 还有一个404 的页面，
					{
						// 1级级路由
						component: RouteWithSubRouters,
						icon: <DiffOutlined />,
						name: "博客管理",
						path: "/article-manage",
						routes: blog,
					},

					{
						// 1级级路由
						component: RouteWithSubRouters,
						icon: <BoldOutlined />,
						name: "个人中心", // 因为个人中心有很多模块: 记账系统， plan模块, 知识管理
						path: "/person",
						routes: person,
					},
				],
			},
		],
	},
]
