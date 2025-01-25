import type { NextFunction, Request, Response } from "express";

export const PassJsonMiddlware = (err: SyntaxError & { status?: number; body?: string }, req: Request, _res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    req.body = {};
    next();
  } else {
    next(err);
  }
};
