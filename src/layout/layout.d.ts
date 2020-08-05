/*
 * @Author: wuyu
 * @Date: 2020-08-02 11:07:44
 * @LastEditors: wuyu
 * @LastEditTime: 2020-08-02 11:09:21
 * @Description: 声明文件
 * @FilePath: /blog_react/src/layout/layout.d.ts
 */

import { RouteConfigComponentProps } from "react-router-config"

interface IRouteProps {
	history: RouteConfigComponentProps["history"]
	location: RouteConfigComponentProps["location"]
}
