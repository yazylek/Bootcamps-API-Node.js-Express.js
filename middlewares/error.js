import { ErrorResponse } from "../util/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // dev console
  console.error(err);

  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, msg: error.message || "Server Error" });
};
