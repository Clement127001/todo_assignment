import mongoose from "mongoose";
import { env } from "../config/env.js";

console.log("Mongo URI exists:", !!env.MONGO_URI);
console.log("Connecting to MongoDB...");

try {
  await mongoose.connect(env.MONGO_URI);

  console.log("MongoDB connected successfully!");
  console.log("Ready state:", mongoose.connection.readyState);

  await mongoose.connection.close();

  console.log("MongoDB connection closed.");
} catch (error) {
  console.error("MongoDB connection failed:");
  console.error(error);
}
