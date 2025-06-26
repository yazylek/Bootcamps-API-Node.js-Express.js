import mongoose, { model } from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import fs from "fs";
import { connectDB } from "./config/db.js";

import path from "path";
import { fileURLToPath } from "url";
import { CourseSchema } from "./models/Courses.js";
import User from "./models/User.js";
import { Bootcamp } from "./models/Bootcamps.js";
import { Course } from "./models/Courses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/config.env" });

connectDB();

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const course = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(course);
    await User.create(users);
    console.log("Data imported...".green.bold);
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
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
