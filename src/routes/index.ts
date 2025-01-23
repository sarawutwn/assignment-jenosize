import productRouter from "./products.routes";
import authRouter from "./auth.routes";
import express from "express";

export default (app: express.Application) => {
  app.use(`/api/products`, productRouter);
  app.use(`/api/auth`, authRouter);
};
