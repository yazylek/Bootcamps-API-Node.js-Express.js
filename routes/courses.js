import express from "express";

import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.js";
import { protect, roleAuthorize } from "../middlewares/auth.js";

export const courseRouter = express.Router({ mergeParams: true });

courseRouter
  .route("/")
  .get(getCourses)
  .post(protect, roleAuthorize("publisher", "admin"), createCourse);
courseRouter
  .route("/:id")
  .get(getCourse)
  .put(protect, roleAuthorize("publisher", "admin"), updateCourse)
  .delete(protect, roleAuthorize("publisher", "admin"), deleteCourse);
