import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/async.js";
import { geocoder } from "../util/geocoder.js";
import { Bootcamp } from "../models/Bootcamps.js";
import { ErrorResponse } from "../util/errorResponse.js";
/**
 *  @Desc        Get all Bootcamps
 *  @Route       GET /api/v1/bootcamps/:id
 *  @Access      Public
 */
export const getAllBootcamps = asyncHandler(async (req, res, next) => {
  // TODO Query $LTE $GTE etc...

  let queryObj = { ...req.query };

  //! Sorting & Select

  const excluded = ["select", "sort", "page", "limit"];

  excluded.forEach((item) => delete queryObj[item]);

  let query = Bootcamp.find(queryObj).populate("Courses");

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    console.log(fields);
    query = query.select(fields);
  }

  if (req.query.sort) {
    const fields = req.query.sort.split(",").join(" ");
    query = query.sort(fields);
  } else {
    query = query.sort("-createdAt");
  }

  //! Do powtórki paginacja

  const pagination = {};
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex < 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const bootcamp = await query;
  res
    .status(200)
    .json({ success: true, count: bootcamp.length, pagination, bootcamp });
});

/**
 *  @Desc        Get Bootcamp
 *  @Route       GET /api/v1/bootcamps/:id
 *  @Access      Public
 */
export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return res
      .status(400)
      .json({ success: false, msg: "Couldn't find bootcamp" });
  }

  res.status(200).json({ success: true, bootcamp });
});

/**
 *  @Desc        Create Bootcamp
 *  @Route       POST /api/v1/bootcamps
 *  @Access      Private
 */
export const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(200).json({ success: true, data: bootcamp });
});

/**
 *  @Desc        Update Bootcamp
 *  @Route       PUT /api/v1/bootcamps/:id
 *  @Access      Private
 */
export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!bootcamp) {
    return res.status(404).json({ success: false });
  }

  res.status(200).json({ success: true, bootcamp });
});

/**
 *  @Desc        Delete Bootcamp
 *  @Route       DELETE /api/v1/bootcamps/:id
 *  @Access      Private
 */
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return res.status(404).json({ success: false });
  }

  await bootcamp.deleteOne();

  res.status(200).json({ success: true, data: {} });
});

/**
 *  @Desc        Get Bootcamps within a radius
 *  @Route       GET /api/v1/bootcamps/:zipcode/:distance
 *  @Access      Public
 */
export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //! Calc radius
  //! Divide distby radius of earth

  const radius = distance / 6378;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
