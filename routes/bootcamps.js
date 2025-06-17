import express from "express";

import {
  createBootcamp,
  getAllBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
} from "../controllers/bootcamps.js";

export const bootcampRouter = express.Router();

bootcampRouter.route("/").get(getAllBootcamps).post(createBootcamp);

bootcampRouter
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
