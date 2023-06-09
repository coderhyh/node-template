import { Context, Next } from 'koa'

import { password2md5 } from '~/common/utils'
import errorTypes from '~/constants/error-types'
import userService from '~/service/user-service'

class UserMiddleware {
  async registerVerifyParams(ctx: Context, next: Next) {
    const { userName, passWord } = ctx.request.body as User.IUser
    const userNameReg = /^[a-zA-Z\d]{8,16}$/g
    const passWordReg = /^[\da-zA-z_]{8,16}$/g
    if (!userNameReg.test(userName) || !passWordReg.test(passWord)) {
      ctx.app.emit('error', errorTypes.USERNAME_OR_PASSWORD_INCONFORMITY, ctx)
      return
    }

    const res = await userService.getUserByName(userName)
    if (Array.isArray(res) && res.length) {
      ctx.app.emit('error', errorTypes.USER_ALREADY_EXISTS, ctx)
      return
    }
    await next()
  }

  async loginVerifyParams(ctx: Context, next: Next) {
    const user = ctx.request.body as User.IUser
    user.passWord = password2md5(user.passWord)
    const res = await userService.getUserInfo(user)
    if (!res.length) {
      ctx.app.emit('error', errorTypes.USERNAME_OR_PASSWORD_ERROR, ctx)
      return
    }
    await next()
  }
}
export const { registerVerifyParams, loginVerifyParams } = new UserMiddleware()
