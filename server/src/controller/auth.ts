import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import User from "../models/user.js";
import { Request, Response, NextFunction } from "express";

export const register = async (req: Request, res: Response) => {
  const { email } = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser) throw new BadRequestError("User already exists, try to login");

  const newUser = await User.create(req.body);
  const token = newUser.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide the valid credentials");

  const foundUser = await User.findOne({ email });
  if (!foundUser) throw new BadRequestError("User not found");

  const isPasswordMatched = await foundUser.comparePassword(password);
  if (!isPasswordMatched) throw new BadRequestError("Invalid Password");

  const token = foundUser.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { name: foundUser.name, userId: foundUser._id }, token });
};
