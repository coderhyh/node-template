import Router from "koa-router";

import { register_create, login_create } from "~/interface/user-interface";
import { register_verifyParams, login_verifyParams } from "~/middleware/user-middleware";
import { requiredField } from "~/middleware/requiredField";

const userRouter = new Router({ prefix: "/user" });

userRouter.post(
  "/register",
  requiredField(['userName', 'passWord']),
  register_verifyParams,
  register_create
);
userRouter.post(
  "/login",
  requiredField(['userName', 'passWord']),
  login_verifyParams,
  login_create
);

module.exports = userRouter;
