import { Request, Response } from "express";
import Todo from "../models/todo.js";
import BadRequestError from "../errors/bad-request.js";
import { StatusCodes } from "http-status-codes";
import { checkTodoAvailability, getTodoId } from "../utils/todo.js";

export const createTodo = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const todo = await Todo.create({
    ...req.body,
    author: userId,
  });

  res.status(StatusCodes.CREATED).json({
    todo,
  });
};

export const getAllTodos = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const todos = await Todo.find({
    author: userId,
  })
    .select("title description completed")
    .sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({
    todos,
  });
};

export const getTodoDetails = async (req: Request, res: Response) => {
  const todoId = getTodoId(req.params.todoId);
  const { userId } = req.user!;

  if (!todoId) {
    throw new BadRequestError("Todo id is not found");
  }

  const todo = await Todo.findOne({
    _id: todoId,
    author: userId,
  });

  if (!todo) {
    throw new BadRequestError("Todo not found");
  }

  res.status(StatusCodes.OK).json({
    todo,
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const todoId = getTodoId(req.params.todoId);
  const { userId } = req.user!;

  if (!todoId) {
    throw new BadRequestError("Todo id is not found");
  }

  await checkTodoAvailability(todoId, userId);

  await Todo.findOneAndUpdate({ _id: todoId }, { ...req.body });

  res.status(StatusCodes.OK).json({ msg: "Todo updated successfully" });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todoId = getTodoId(req.params.todoId);
  const { userId } = req.user!;

  if (!todoId) {
    throw new BadRequestError("Todo id is not found");
  }

  await checkTodoAvailability(todoId, userId);

  await Todo.findOneAndDelete({ _id: todoId });

  res.status(StatusCodes.OK).json({ msg: "Todo deleted successfully" });
};
