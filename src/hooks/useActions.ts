/*
 * @Author: wuyu
 * @Date: 2020-07-11 08:55:44
 * @LastEditors: wuyu
 * @LastEditTime: 2020-07-15 15:00:51
 * @Description:
 * @FilePath: /blog_react/src/hooks/useActions.ts
 */

import { useMemo, DependencyList } from "react"
import { bindActionCreators } from "redux"
import { useDispatch } from "react-redux"
// 这个主要是用于配合saga  处理异步请求
import {
	bindPromiseCreators,
	PromiseCreator,
	ActionCreatorFunction,
	Routine,
} from "redux-saga-routines"

type actionType = Routine | PromiseCreator | ActionCreatorFunction

// hooks 一定要以use开头
function useActions(
	actions: {
		[kye: string]: actionType
	},
	deps?: DependencyList | undefined
): any {
	const dispatch = useDispatch()

	return useMemo(
		() => {
			const newActions = actions
			const keys = Object.keys(actions)
			keys.forEach((key: string) => {
				if (newActions[key].length === 2) {
					newActions[key] = bindPromiseCreators(
						actions[key] as PromiseCreator,
						dispatch
					)
				} else {
					newActions[key] = bindActionCreators(
						actions[key] as Routine,
						dispatch
					)
				}
			})

			return newActions
		},
		deps ? [dispatch, ...deps] : [dispatch]
	)
}

export default useActions
