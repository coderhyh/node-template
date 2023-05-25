import crypto from 'crypto'
import { Context } from 'koa'
import os from 'os'

import errorTypes from '~/constants/error-types'

export const password2md5 = (password: string) => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(password).digest('hex')
  return result
}

export function getIpAddress() {
  const ifaces = os.networkInterfaces()
  for (const dev in ifaces) {
    const iface = ifaces[dev]
    if (iface) {
      for (let i = 0; i < iface.length; i++) {
        const { family, address, internal } = iface[i]
        if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
      }
    }
  }
}

export const handlerServiceError = async (ctx: Context, fn: Function): Promise<any> => {
  try {
    return await fn()
  } catch (err) {
    console.log('handlerServiceError -----> ', err)
    ctx.app.emit('error', errorTypes.SERVER_ERROR, ctx)
    return err
  }
}

export const getDataType = (data: any): App.IDataType =>
  Object.prototype.toString.call(data).match(/\[object ([a-zA-Z]+)\]/)[1]

export function buildTree(data: any[]) {
  const tree: { [k: string]: any } = {}
  const roots: any[] = []

  data.forEach((node) => {
    tree[node.id] = { ...node, children: [] }
  })

  data.forEach((node) => {
    if (node.parentId !== null) {
      tree[node.parentId].children.push(tree[node.id])
    } else {
      roots.push(tree[node.id])
    }
  })

  return roots
}
