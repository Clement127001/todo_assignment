import { afterAll, describe, it, expect } from "vitest";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";

describe("Database", () => {
  it("should connect to MongoDB", async () => {
    await connectDatabase();

    expect(mongoose.connection.readyState).toBe(1);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
