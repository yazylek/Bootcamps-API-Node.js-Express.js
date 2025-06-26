import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { bootcampRouter } from "./routes/bootcamps.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.js";
import { courseRouter } from "./routes/courses.js";
import { authRouter } from "./routes/auth.js";
import expressMongoSanitize from "@exortek/express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(express.json());

// sanitize data
app.use(expressMongoSanitize());

// set security headers
app.use(helmet());

// prevent xss attacks
app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

// rate limiting

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 min
  max: 100,
});

app.use(limiter);

// prevent http param pollution
app.use(hpp());

app.use(cors());

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
