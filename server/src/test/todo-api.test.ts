import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import { connectDatabase } from "../config/db.js";
import User from "../models/user.js";
import Todo from "../models/todo.js";

describe("Todo API", () => {
  let token: string;
  let userId: string;
  let todoId: string;

  beforeAll(async () => {
    await connectDatabase();

    const email = `todo-api-${Date.now()}@example.com`;

    const user = await User.create({
      name: "Todo API User",
      email,
      password: "password123",
    });

    userId = user._id.toString();

    const loginResponse = await request(app).post("/api/auth/login").send({
      email,
      password: "password123",
    });

    expect(loginResponse.status).toBe(200);

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await Todo.deleteMany({
      author: userId,
    });

    await User.deleteOne({
      _id: userId,
    });

    await mongoose.connection.close();
  });

  it("should create a todo", async () => {
    const response = await request(app)
      .post("/api/todo")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Learn TypeScript",
        description: "Complete TypeScript practice for the Todo assignment",
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("todo");

    expect(response.body.todo.title).toBe("Learn TypeScript");
    expect(response.body.todo.description).toBe(
      "Complete TypeScript practice for the Todo assignment",
    );
    expect(response.body.todo.completed).toBe(false);

    todoId = response.body.todo._id;
  });

  it("should get all todos for the authenticated user", async () => {
    const response = await request(app)
      .get("/api/todo")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("todos");
    expect(Array.isArray(response.body.todos)).toBe(true);

    expect(response.body.todos.length).toBeGreaterThan(0);
  });

  it("should get a todo by id", async () => {
    const response = await request(app)
      .get(`/api/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("todo");

    expect(response.body.todo._id).toBe(todoId);
    expect(response.body.todo.title).toBe("Learn TypeScript");
  });

  it("should update a todo", async () => {
    const response = await request(app)
      .put(`/api/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Learn Advanced TypeScript",
        description: "Complete advanced TypeScript practice for the assignment",
        completed: true,
      });

    expect(response.status).toBe(200);

    expect(response.body.msg).toBe("Todo updated successfully");
  });

  it("should return the updated todo", async () => {
    const response = await request(app)
      .get(`/api/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.todo.title).toBe("Learn Advanced TypeScript");

    expect(response.body.todo.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const response = await request(app)
      .delete(`/api/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.msg).toBe("Todo deleted successfully");
  });

  it("should not find the deleted todo", async () => {
    const response = await request(app)
      .get(`/api/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
