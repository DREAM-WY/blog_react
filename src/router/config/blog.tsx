/***
 * @auth: dmx
 * @time: 2020/7/7
 * @func:
 * @params:
 * @return:
 * @updateTime:
 ***/
import React from "react"
import RouteWithSubRouters from "../RouteWithSubRouters"
import Tag from "../../pages/blog-manage/tag"
import CreateTag from "../../pages/blog-manage/tag/CreateTag"
import Article from "../../pages/blog-manage/article"
import {
	UnderlineOutlined,
	FontSizeOutlined,
	BgColorsOutlined,
	SmallDashOutlined,
	PieChartOutlined,
} from "@ant-design/icons"

const blog = [
	{
		// 2级级路由
		component: Tag,
		icon: <UnderlineOutlined />,
		name: "博客面板",
		path: "/blog-dashboard",
	},
	{
		// 2级级路由
		component: RouteWithSubRouters,
		icon: <UnderlineOutlined />,
		name: "标签管理",
		path: "/tag",
		routes: [
			{
				// 3级级路由
				component: RouteWithSubRouters,
				icon: <FontSizeOutlined />,
				name: "标签列表",
				path: "/list",
				routes: [
					{
						// 4级级路由
						component: Tag,
					},
					{
						path: "/create",
						icon: <BgColorsOutlined />,
						name: "新建标签",
						component: CreateTag,
					},
				],
			},
		],
	},
	{
		// 2级级路由
		component: RouteWithSubRouters,
		icon: <SmallDashOutlined />,
		name: "文章管理",
		path: "/article",
		routes: [
			{
				// 3级级路由
				component: RouteWithSubRouters,
				icon: <PieChartOutlined />,
				name: "文章列表",
				path: "/list",
				routes: [
					{
						// 4级级路由
						component: Article,
					},
					{
						path: "/create",
						icon: <BgColorsOutlined />,
						name: "新建文章",
						component: CreateTag,
					},
				],
			},
		],
	},
]

export default blog
