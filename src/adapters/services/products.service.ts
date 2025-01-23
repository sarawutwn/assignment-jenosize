import type { ProductServicePorts } from "../../ports/products/products.ports";
import { PrismaClient, type Products } from "@prisma/client";

export class ProductService implements ProductServicePorts {
  constructor(private prisma: PrismaClient) {}

  async createProduct(product_name: string, product_price: number, product_stock_quantity: number): Promise<Products> {
    return this.prisma.products.create({ data: { product_name, product_price, product_stock_quantity } });
  }

  updateProduct(product_id: string, product_name: string, product_price: number, product_stock_quantity: number): Promise<Products> {
    return this.prisma.products.update({ where: { product_id }, data: { product_name, product_price, product_stock_quantity } });
  }

  getProductByID(product_id: string): Promise<Products | null> {
    return this.prisma.products.findUnique({ where: { product_id } });
  }

  getAllProducts(product_name: string | null): Promise<Products[] | []> {
    return this.prisma.products.findMany({ where: product_name ? { product_name: { contains: product_name, mode: "insensitive" } } : {} });
  }
}
