import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app.js";

describe("Application", () => {
  it("should return health status", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Server is healthy");
  });
});
