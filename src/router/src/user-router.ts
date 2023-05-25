import Router from 'koa-router'

import { loginCreate, registerCreate } from '~/interface/user-interface'
import { loginVerifyParams, registerVerifyParams } from '~/middleware/user-middleware'
import { requiredField } from '~/middleware/verify-middleware'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/register', requiredField(['userName', 'passWord']), registerVerifyParams, registerCreate)
userRouter.post('/login', requiredField(['userName', 'passWord']), loginVerifyParams, loginCreate)

module.exports = userRouter
