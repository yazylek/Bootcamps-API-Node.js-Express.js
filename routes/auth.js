import express from "express";
import {
  forgotPassword,
  getUser,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";

export const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/user").get(protect, getUser);
authRouter.route("/forgotpassword").post(forgotPassword);
authRouter.route("/resetpassword/:resettoken").put(resetPassword);
