import { Request, Response, NextFunction, RequestHandler } from "express";
import { Forbidden, BadRequest } from "../errors/index.js";

const verifyRoles = (...allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new BadRequest("Unauthorized: No user found");
    }

    const roles = req.user.roles;
    if (!roles || roles.length === 0) {
      throw new BadRequest("Unauthorized: No roles found");
    }
    const hasRole = roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      throw new Forbidden(
        "Unauthorized: You do not have permission to perform this action"
      );
    }
    next();
  };
};

export default verifyRoles;
