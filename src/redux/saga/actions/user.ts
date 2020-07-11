import { createRoutine, promisifyRoutine } from "redux-saga-routines"
import extendRoutine from "../extendRoutine"
import NAME_SPCE from "../../../constants/name-spce/index"

export const loginAction = extendRoutine(createRoutine(`${NAME_SPCE.USER}`), [
	{
		type: "LOG_OUT",
		action: "logOut",
	},
])
export const loginASctionPrpmise = promisifyRoutine(loginAction)
