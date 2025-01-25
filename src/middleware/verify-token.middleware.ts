import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseUtils } from "../utils/response.utils";

const SECRET_KEY = process.env.SERVER_SECRET_KEY || "";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const responseUtils = new ResponseUtils();
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json(responseUtils.errorResponse(403, "Forbidden: Invalid Token"));
        return;
      }
      next();
    });
  } else {
    res.status(403).json(responseUtils.errorResponse(403, "Unauthorized: No Token Provided"));
    return;
  }
};
