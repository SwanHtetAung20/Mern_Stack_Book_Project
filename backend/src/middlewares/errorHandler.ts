import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

interface CustomError {
  statusCode: number;
  message: string;
}

export const customErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError: CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong. Please try again later.!",
  };

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
  }

  if (err && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `This email ${err.keyValue.email}  is already existed in System. Please choose another.!`;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};
