import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Unauthorized, Forbidden } from "../errors/index.js";

const isAuthorize = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("Unauthorized Request");
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = { id: decoded.id, name: decoded.username, roles: decoded.roles };
    next();
  } catch (err) {
    throw new Forbidden("Invalid or Expired Token. Please login again.!");
  }
};

export default isAuthorize;
