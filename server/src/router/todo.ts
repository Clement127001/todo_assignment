import express from "express";
import { validate } from "../utils/validate.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoDetails,
  updateTodo,
} from "../controller/todo.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../modules/todo/todo.schema.js";

const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);
todoRouter.get("/:todoId", getTodoDetails);
todoRouter.post("/", validate(createTodoSchema), createTodo);
todoRouter.put("/:todoId", validate(updateTodoSchema), updateTodo);
todoRouter.delete("/:todoId", deleteTodo);

export default todoRouter;
