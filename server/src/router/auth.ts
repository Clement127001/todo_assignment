import express from "express";
import { login, register } from "../controller/auth.js";
import { validate } from "../utils/validate.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../modules/user/user.schema.js";

const authRouter = express.Router();

authRouter.post("/sign-up", validate(registerUserSchema), register);
authRouter.post("/login", validate(loginUserSchema), login);

export default authRouter;
