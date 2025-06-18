import { ErrorResponse } from "../util/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // dev console
  console.error(err.name);

  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, msg: error.message || "Server Error" });
};
