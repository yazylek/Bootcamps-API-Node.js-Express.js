import express from "express";
import { getUser, login, register } from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";

export const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/user").get(protect, getUser);
