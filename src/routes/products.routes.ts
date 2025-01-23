import express from "express";
import { ProductController } from "../adapters/controllers/products.controller";
import { ProductService } from "../adapters/services/products.service";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();
const service = new ProductService(prisma);
const controller = new ProductController(service);

router.get("/", controller.getAllProducts.bind(controller));
router.get("/:product_id", controller.getProductByID.bind(controller));
router.post("/", controller.createProduct.bind(controller));
router.put("/:product_id", controller.updateProduct.bind(controller));

export default router;
