/*
 * @Author: wuyu
 * @Date: 2020-07-12 00:08:32
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-12 22:33:33
 * @Description:
 * @FilePath: /blog_react/src/http/http.ts
 */

/***
 * @auth: dmx
 * @time: 2020/6/18
 * @func: 基于axios 二次封装
 ***/
import AxiosInstance, {
	AxiosStatic,
	AxiosPromise,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios"
import { message } from "antd"
import { setRetryTip } from "../redux/saga/actions/common"
import store from "../redux"
import { resolve } from "dns"
import { rejects } from "assert"
// 定义一个请求的参数类型声明
type requestFn = (
	url: string,
	params?: Object,
	data?: Object | null
) => AxiosPromise

class Http {
	/*
	 * 说明一下为什么要用 AxiosInstance 而不用 axios.create()这种方式
	 * 可能将来咱么这个项目要扩展，需要请求另一个网站的数据
	 * 比如 需要请求 baidu.com，又需要请求tencent.com
	 * 那么就有一个问题，axios.create()创建的对象，baseUrl有且只有一个，也就是说只可以指定一个
	 * 如果制定了百度的  就不能在指定腾讯的 指定了也不起作用
	 * AxiosInstance 他就是为了解决这个问题
	 * */

	// 请求对象
	private axios: AxiosStatic = AxiosInstance
	// 请求失败是重试请求的间隔时间
	private retryDelay: number = 1000
	// 重试的次数 一般来说生产10次开发4次
	private retry: number = Number(process.env.REACT_APP_RETRY) || 4

	constructor() {
		const { axios } = this
		axios.defaults.timeout = 10000
		axios.defaults.baseURL = process.env.REACT_APP_API_URL
		axios.defaults.headers = {
			"Content-Type": "application/json;charset=UTF-8",
		}
		// 执行 请求拦截器 和响应拦截器
		this.useInterceptResponse()
		this.useInterceptRequest()
	}
	// 响应拦截器
	useInterceptResponse() {
		this.axios.interceptors.response.use(
			(res: AxiosResponse) => {
				// errorCode
				if (res.data.errorCode === "101010500") {
					message.error("服务器错误!")
				}
				// token过期
				if (res.data.errprCode === "102022001") {
					message.error("身份信息已过期,请重新登陆!")
					// 还需要跳转到login页面
				}
				// 别的情况
				if (res.data.errprCode !== 0) {
					message.error("服务器异常!")
					// 还需要跳转到login页面
				}
				// 如果还有别的逻辑就在这里继续写
				return Promise.reject(res.data)
			},
			(error: AxiosError) => {
				const { config } = error
				let retryCount = config.headers["axios-retry"] || 0
				if (retryCount >= this.retry) {
					// 告诉redux 重试次数已超过指定的次数
					store.dispatch(setRetryTip(true))
					return Promise.reject(error)
				}
				retryCount += 1
				const backoff = new Promise(resolve => {
					setTimeout(() => {
						resolve()
					}, this.retryDelay | 1)
				})
				// 修改重试次数
				config.headers["axios-retry"] = retryCount
				// 必须要error 中config中显示绑定才回去执行
				return backoff.then(() => {
					this.axios(config)
				})
			}
		)
	}
	// 请求拦截器
	useInterceptRequest() {
		this.axios.interceptors.request.use(
			async (config: AxiosRequestConfig) => {
				// config是发出请求默认的config配置,包括url method data
				// 因为后面需要往服务器上发数据的时候需要发送token
				const newConfig = config
				// 获取token 登陆过我们吧token存在本地 就用localStorage
				const token = localStorage.getItem("token")

				if (token) {
					newConfig.headers.authtoken = token
				}
				return newConfig
			},
			(error: AxiosError) => Promise.reject(error)
		)
	}

	// 封装一个底层的公用拦截器的方法
	// type: 请求的方式 GET 和POST
	// url:  请求的地址
	// options: 请求的参数
	// isComplex: 是否平铺 一般用于get {a: 1, b: 2} 转换成 a=1&b=2
	private fetchData(
		type: string,
		url: string,
		options?: Object,
		isComplex?: boolean
	) {
		if (isComplex) {
			return this.axios[type](url, null, options)
		}
		return this.axios[type](url, options)
	}
	private get: requestFn = (url: string, params: Object | undefined) => {
		if (!params) {
			return this.fetchData("get", url)
		}
		// 因为get请求可能被换成 所有我们给他们添加一个随机数
		const newParams = Object.assign(params, {
			[`dmx${new Date().getTime()}`]: 1,
		})
		return this.fetchData("get", url, { params: newParams })
	}

	// 因为post put pacth delete,  底层函数调用都差不多, 可以封装成一个方法
	private commonRequest(
		type: string,
		url: string,
		params?: Object,
		data?: Object | null
	): AxiosPromise {
		let options: Object = {
			params,
			data,
		}
		if (params && data === undefined) {
			options = {
				data: params,
			}
		}
		if (data === null) {
			options = {
				params,
			}
		}

		return this.fetchData(type, url, options, true)
	}

	// params 是post地址后面带的参数
	// data 请求体  body的数据
	private post: requestFn = (
		url: string,
		params: Object | undefined,
		data: Object | undefined | null
	) => {
		return this.commonRequest("post", url, params, data)
	}
	// put 请求
	private put: requestFn = (
		url: string,
		params: Object | undefined,
		data: Object | undefined | null
	) => {
		return this.commonRequest("put", url, params, data)
	}
	private pacth: requestFn = (
		url: string,
		params: Object | undefined,
		data: Object | undefined | null
	) => {
		return this.commonRequest("pacth", url, params, data)
	}
	private delete: requestFn = (
		url: string,
		params: Object | undefined,
		data: Object | undefined | null
	) => {
		return this.commonRequest("delete", url, params, data)
	}
}
export default new Http()
