import type { NextFunction, Request, Response } from "express";
import { ResponseUtils } from "../utils/response.utils";

export const NotfoundMiddlware = (_req: Request, res: Response, _next: NextFunction) => {
  const responseUtils = new ResponseUtils();
  res.status(404).json(responseUtils.errorResponse(404, "Route not found."));
};
