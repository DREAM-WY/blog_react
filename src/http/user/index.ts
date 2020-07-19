/*
 * @Author: wuyu
 * @Date: 2020-07-15 14:22:34
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-15 14:25:21
 * @Description: user的 api请求
 * @FilePath: /blog_react/src/http/user/index.ts
 */
import http from "../http"
export const login = (options: ILogin) => http.post("/login", options)
// 刷新token
export const refreshToken = (authToken: string) =>
	http.put("/auth/tokens", { refreshToken }, null)
