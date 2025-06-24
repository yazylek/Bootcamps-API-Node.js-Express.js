import express from "express";

import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.js";
import { protect } from "../middlewares/auth.js";

export const courseRouter = express.Router({ mergeParams: true });

courseRouter.route("/").get(getCourses).post(protect, createCourse);
courseRouter
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);
