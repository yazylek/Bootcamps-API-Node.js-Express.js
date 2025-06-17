import mongoose from "mongoose";
import { BootcampSchema } from "../models/Bootcamps.js";

const Bootcamp = mongoose.model("bootcamp", BootcampSchema);

/**
 *  @Desc        Get all Bootcamps
 *  @Route       GET /api/v1/bootcamps/:id
 *  @Access      Public
 */
export const getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();

    res.status(200).json({ success: true, bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
    console.error(err);
  }
};

/**
 *  @Desc        Get Bootcamp
 *  @Route       GET /api/v1/bootcamps/:id
 *  @Access      Public
 */
export const getBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res
        .status(400)
        .json({ success: false, msg: "Couldn't find bootcamp" });
    }

    res.status(200).json({ success: true, bootcamp });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  }
};

/**
 *  @Desc        Create Bootcamp
 *  @Route       POST /api/v1/bootcamps
 *  @Access      Private
 */
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  }
};

/**
 *  @Desc        Update Bootcamp
 *  @Route       PUT /api/v1/bootcamps/:id
 *  @Access      Private
 */
export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!bootcamp) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, bootcamp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

/**
 *  @Desc        Delete Bootcamp
 *  @Route       DELETE /api/v1/bootcamps/:id
 *  @Access      Private
 */
export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
