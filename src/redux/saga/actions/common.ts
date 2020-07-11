

import { createRoutine, promisifyRoutine } from 'redux-saga-routines'
import extendRoutine from '../extendRoutine'
import NAME_SPACE from '../../../constants/name-spce/index'


//超时提示  发送请求如果失败了 那么就会重试  如果超过重试次数 就会触发这个action 提示用户超时

export const setRetryTip = createRoutine(`${NAME_SPACE.COMMON}`)

