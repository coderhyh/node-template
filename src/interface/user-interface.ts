import type { Context } from 'koa'

import { password2md5 } from '~/common/utils'
import errorTypes from '~/constants/error-types'
import userService from '~/service/user-service'

class UserInterface {
  async registerCreate(ctx: Context) {
    const user = ctx.request.body as User.IUser
    user.passWord = password2md5(user.passWord)
    const res = await userService.createUser(user).catch((err) => err)

    if (Array.isArray(res) && res[0].affectedRows) {
      ctx.body ??= {
        code: 200,
        message: '注册成功'
      }
    } else {
      ctx.app.emit('error', errorTypes.SERVER_ERROR, ctx)
    }
  }

  async loginCreate(ctx: Context) {
    ctx.body ??= {
      code: 200,
      msg: '登陆成功',
      token: '123'
    }
  }
}

export const { registerCreate, loginCreate } = new UserInterface()
