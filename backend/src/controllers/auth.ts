import { Request, Response } from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthorized } from "../errors/index.js";

const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.generateAccessToken();
  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Unauthorized("Please provide both fields.!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Invalid credentials");
  }
  const isMatch = bcryptjs.compare(password, user.password);

  if (!isMatch) {
    throw new Unauthorized("Invalid credentials");
  }
  const token = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  // * save user with refresh token
  await user.save();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Unauthorized("Please login again.!");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw new Unauthorized("Please login again.!");
  }
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    const token = user.generateAccessToken();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (err) {
    throw new Unauthorized("Please login again.!");
  }
};

export { register, login, handleRefreshToken };
