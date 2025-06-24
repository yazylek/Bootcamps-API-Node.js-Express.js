import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import node_geocoder from "node-geocoder";

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

export const geocoder = node_geocoder(options);
