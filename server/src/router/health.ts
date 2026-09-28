import { Request, Response } from "express";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";

const health = async (req: Request, res: Response) => {
  throw new NotFoundError("Dummy not found Error");

  res.json({
    success: true,
    message: "Server is healthy",
  });
};

export default health;
