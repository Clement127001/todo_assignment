import { Request, Response } from "express";

const health = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
};

export default health;
