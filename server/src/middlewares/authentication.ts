import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import UnauthenticatedError from "../errors/unauthenticated.js";

export interface AuthPayload extends JwtPayload {
  userId: string;
  name: string;
}

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorized user");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthenticatedError("Unauthorized user");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;

    req.user = {
      userId: payload.userId,
      name: payload.name,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized user");
  }
};

export default authMiddleware;
