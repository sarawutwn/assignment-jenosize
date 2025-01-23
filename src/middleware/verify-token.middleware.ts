import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = Bun.env.SERVER_SECRET_KEY || "";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid Token" });
      }
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized: No Token Provided" });
  }
};
