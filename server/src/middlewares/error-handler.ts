import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import CustomAPIError from "../errors/custom-api.js";

const errorHandlerMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  let message = "Something went wrong, please try again later";

  if (err instanceof CustomAPIError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = err.issues.map((issue) => issue.message).join(", ");
  } else if (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    err.name === "CastError"
  ) {
    statusCode = StatusCodes.BAD_REQUEST;
    const value = "value" in err ? err.value : "unknown";
    message = `No item found with id : ${value}`;
  }

  // Mongoose ValidationError
  else if (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    err.name === "ValidationError"
  ) {
    statusCode = StatusCodes.BAD_REQUEST;

    if (
      "errors" in err &&
      typeof err.errors === "object" &&
      err.errors !== null
    ) {
      message = Object.values(err.errors)
        .map((error) => {
          if (
            typeof error === "object" &&
            error !== null &&
            "message" in error
          ) {
            return String(error.message);
          }

          return "Validation failed";
        })
        .join(", ");
    }
  }

  // MongoDB duplicate key error
  else if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === 11000
  ) {
    statusCode = StatusCodes.BAD_REQUEST;

    if (
      "keyValue" in err &&
      typeof err.keyValue === "object" &&
      err.keyValue !== null
    ) {
      const fields = Object.keys(err.keyValue);

      message = `${fields.join(", ")} already exists, please choose another value`;
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandlerMiddleware;
