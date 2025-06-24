import express from "express";

import {
  createBootcamp,
  getAllBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} from "../controllers/bootcamps.js";
import { courseRouter } from "./courses.js";
import { protect } from "../middlewares/auth.js";

export const bootcampRouter = express.Router();

bootcampRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampRouter.use("/:bootcampId/courses", courseRouter);

bootcampRouter.route("/").get(getAllBootcamps).post(protect, createBootcamp);

bootcampRouter
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);
