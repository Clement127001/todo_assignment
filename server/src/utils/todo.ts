import BadRequestError from "../errors/bad-request.js";
import Todo from "../models/todo.js";
import { requestParams } from "../types/todo.js";

export const checkTodoAvailability = async (todoId: string, userId: string) => {
  const todo = await Todo.findOne({ _id: todoId, author: userId });

  if (!todo) {
    throw new BadRequestError("Todo not found");
  }
};

export const getTodoId = (params: requestParams): string | undefined => {
  if (Array.isArray(params)) {
    return params[0];
  }
  return params || undefined;
};
