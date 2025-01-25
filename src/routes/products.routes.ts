import express from "express";
import { ProductController } from "../adapters/controllers/products.controller";
import { ProductService } from "../adapters/services/products.service";

import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/verify-token.middleware";
const prisma = new PrismaClient();

const router = express.Router();
const service = new ProductService(prisma);
const controller = new ProductController(service);

router.get("/", verifyToken, controller.getAllProducts.bind(controller));
router.get("/:product_id", verifyToken, controller.getProductByID.bind(controller));
router.post("/", verifyToken, controller.createProduct.bind(controller));
router.put("/:product_id", verifyToken, controller.updateProduct.bind(controller));

export default router;
