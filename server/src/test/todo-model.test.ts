import { afterAll, beforeAll, describe, expect, it } from "vitest";
import mongoose from "mongoose";

import { connectDatabase } from "../config/db.js";
import Todo from "../models/todo.js";
import User from "../models/user.js";

describe("Todo Model", () => {
  let userId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    await connectDatabase();

    const user = await User.create({
      name: "Todo Test User",
      email: `todo-test-${Date.now()}@example.com`,
      password: "password123",
    });

    userId = user._id;
  });

  afterAll(async () => {
    await Todo.deleteMany({ author: userId });
    await User.deleteOne({ _id: userId });

    await mongoose.connection.close();
  });

  it("should create a todo", async () => {
    const todo = await Todo.create({
      title: "Learn TypeScript",
      description: "Complete TypeScript practice for the Todo assignment",
      author: userId,
    });

    expect(todo.title).toBe("Learn TypeScript");
    expect(todo.description).toBe(
      "Complete TypeScript practice for the Todo assignment",
    );
    expect(todo.author.toString()).toBe(userId.toString());
    expect(todo.completed).toBe(false);
  });

  it("should require a title", async () => {
    await expect(
      Todo.create({
        description: "This description is long enough for the test",
        author: userId,
      }),
    ).rejects.toThrow(/Title is required/);
  });

  it("should reject a title shorter than 4 characters", async () => {
    await expect(
      Todo.create({
        title: "Hey",
        description: "This description is long enough for the test",
        author: userId,
      }),
    ).rejects.toThrow(/Title should have 4 characters at least/);
  });

  it("should require a description", async () => {
    await expect(
      Todo.create({
        title: "Valid Todo",
        author: userId,
      }),
    ).rejects.toThrow(/Description is required/);
  });

  it("should reject a description shorter than 20 characters", async () => {
    await expect(
      Todo.create({
        title: "Valid Todo",
        description: "Too short",
        author: userId,
      }),
    ).rejects.toThrow(/Description should have 20 characters at least/);
  });

  it("should require an author", async () => {
    await expect(
      Todo.create({
        title: "Valid Todo",
        description: "This description is long enough for the test",
      }),
    ).rejects.toThrow(/Path `author` is required/);
  });
});
