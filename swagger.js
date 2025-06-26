import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Bootcamp API",
    description:
      "This API allows users to register, manage bootcamps, create courses, and handle authentication processes like login and password reset.",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger-output.json";
const routes = [
  "./routes/auth.js",
  "./routes/bootcamps.js",
  "./routes/courses.js",
];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
  await import("./server.js"); // Your project's root file
});
