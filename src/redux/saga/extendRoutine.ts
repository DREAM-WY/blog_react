// 用于基于redux-saga-routines 的基本参数
import { createAction } from "redux-actions"
import { Routine, ActionCreatorFunction } from "redux-saga-routines"

type key = string

type ExtendRoutineReturn<T extends key, A extends key> = Routine &
	{ [key in T]: string } &
	{ [key in A]: ActionCreatorFunction }

const createActionCreator = ({
	type,
	typePrefix,
}: {
	type: string
	typePrefix: string
}) => createAction(`${typePrefix}/${type}`)

export default function extendRoutine<T extends key, A extends key>(
	routine: any,
	types: {
		type: T
		action: A
	}[]
): ExtendRoutineReturn<T, A> {
	const typePrefix = routine.toString().replace(/\/([^/]+)\/?$/, "")
	const newRoutine = routine
	types.forEach(({ type: T, action: A }) => {
		const actionCreators = createActionCreator({ type, typePrefix })
		newRoutine[action] = actionCreators
		newRoutine[type] = actionCreators.toString()
	})
	return newRoutine
}
