import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/async.js";
import { CourseSchema } from "../models/Courses.js";
import { Bootcamp } from "../models/Bootcamps.js";
import { ErrorResponse } from "../util/errorResponse.js";

const Course = mongoose.model("Course", CourseSchema);

/**
 *  @Desc        Get Courses
 *  @Route       GET /api/v1/courses
 *  @Route       GET /api/v1/bootcamps/:bootcampId/courses
 *  @Access      Public
 */
export const getCourses = asyncHandler(async (req, res, next) => {
  // #swagger.tags =["Courses"]
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, courses });
});

/**
 *  @Desc        Get Courses
 *  @Route       GET /api/v1/courses/:id
 *  @Access      Public
 */
export const getCourse = asyncHandler(async (req, res, next) => {
  // #swagger.tags =["Courses"]
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, course });
});

/**
 *  @Desc        Post Courses
 *  @Route       POST /api/v1/bootcamps/:bootcampId/courses
 *  @Access      Private
 */
export const createCourse = asyncHandler(async (req, res, next) => {
  // #swagger.tags =["Courses"]
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({ success: true, data: course });
});

/**
 *  @Desc        Update Courses
 *  @Route       PUT /api/v1/courses/:id
 *  @Access      Private
 */
export const updateCourse = asyncHandler(async (req, res, next) => {
  // #swagger.tags =["Courses"]
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({ success: true, course });
});

/**
 *  @Desc        Delete Courses
 *  @Route       DELETE /api/v1/courses/:id
 *  @Access      Private
 */
export const deleteCourse = asyncHandler(async (req, res, next) => {
  // #swagger.tags =["Courses"]
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, course: {} });
});
