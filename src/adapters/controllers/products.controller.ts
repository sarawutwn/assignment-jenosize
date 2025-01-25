import type { Request, Response } from "express";
import type { ProductService } from "../services/products.service";
import { plainToInstance } from "class-transformer";
import { CreateProductDto } from "../../types/dto/products.dto";
import { validate } from "class-validator";
import { ResponseUtils } from "../../utils/response.utils";

export class ProductController {
  constructor(private service: ProductService) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    const responseUtils = new ResponseUtils();
    try {
      // Validate ข้อมูล
      const Body = plainToInstance(CreateProductDto, req.body);
      const errors = await validate(Body);
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(", "));
        res.status(400).json(responseUtils.errorResponse(400, errorMessages));
        return;
      }
      // ส่งข้อมูลที่ Validate แล้วเข้าไปทำงานต่อที่ Service.
      const result = await this.service.createProduct(Body.product_name, Body.product_price, Body.product_stock_quantity);
      res.status(200).json(responseUtils.successResponse(200, "create product successfully.", result));
    } catch (err) {
      console.log(err);
      res.status(500).json(responseUtils.errorResponse(500, "Internal Server Error."));
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const responseUtils = new ResponseUtils();
    try {
      // Validate ข้อมูล
      const Body = plainToInstance(CreateProductDto, req.body);
      const errors = await validate(Body);
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(", "));
        res.status(400).json(responseUtils.errorResponse(400, errorMessages));
        return;
      }
      // ส่งข้อมูลที่ Validate แล้วเข้าไปทำงานต่อที่ Service.
      const result = await this.service.updateProduct(req.params.product_id, Body.product_name, Body.product_price, Body.product_stock_quantity);
      res.status(200).json(responseUtils.successResponse(200, "update product successfully.", result));
    } catch (err) {
      console.log(err);
      res.status(500).json(responseUtils.errorResponse(500, "Internal Server Error."));
    }
  }

  async getProductByID(req: Request, res: Response): Promise<void> {
    const responseUtils = new ResponseUtils();
    try {
      const result = await this.service.getProductByID(req.params.product_id);
      if (!result) {
        res.status(404).json(responseUtils.errorResponse(404, "Not found this product."));
        return;
      }
      res.status(200).json(responseUtils.successResponse(200, "get product by id successfully.", result));
    } catch (err) {
      console.log(err);
      res.status(500).json(responseUtils.errorResponse(500, "Internal Server Error."));
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const responseUtils = new ResponseUtils();
    try {
      const product_name = typeof req.query.product_name === "string" ? req.query.product_name : null;
      const result = await this.service.getAllProducts(product_name);
      if (result.length === 0) {
        res.status(404).json(responseUtils.errorResponse(404, "Not found this product."));
        return;
      }
      res.status(200).json(responseUtils.successResponse(200, "Get all product successfully.", result));
    } catch (err) {
      console.log(err);
      res.status(500).json(responseUtils.errorResponse(500, "Internal Server Error."));
    }
  }
}
