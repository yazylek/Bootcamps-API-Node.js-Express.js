import mongoose, { model } from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import { BootcampSchema } from "./models/Bootcamps.js";
import fs from "fs";
import { connectDB } from "./config/db.js";

import path from "path";
import { fileURLToPath } from "url";
import { CourseSchema } from "./models/Courses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/config.env" });

connectDB();

const Bootcamps = mongoose.model("bootcamp", BootcampSchema);
const Course = mongoose.model("course", CourseSchema);

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const course = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const importData = async () => {
  try {
    await Bootcamps.create(bootcamps);
    await Course.create(course);
    console.log("Data imported...".green.bold);
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await Bootcamps.deleteMany();
    await Course.deleteMany();
    console.log("Data deleted...".red.bold);
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
