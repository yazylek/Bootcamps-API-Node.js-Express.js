import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { bootcampRouter } from "./routes/bootcamps.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.js";
import { courseRouter } from "./routes/courses.js";
import { authRouter } from "./routes/auth.js";

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(express.json());

app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgWhite
      .green.bold
  )
);

// * Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  server.close(() => process.exit(1));
});
