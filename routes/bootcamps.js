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
import { protect, roleAuthorize } from "../middlewares/auth.js";

export const bootcampRouter = express.Router();

bootcampRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampRouter.use("/:bootcampId/courses", courseRouter);

bootcampRouter
  .route("/")
  .get(getAllBootcamps)
  .post(protect, roleAuthorize("publisher", "admin"), createBootcamp);

bootcampRouter
  .route("/:id")
  .get(getBootcamp)
  .put(protect, roleAuthorize("publisher", "admin"), updateBootcamp)
  .delete(protect, roleAuthorize("publisher", "admin"), deleteBootcamp);
