import type { EnumType } from "typescript";
import type { ProductServicePorts } from "../../ports/products.ports";
import { PrismaClient, type Products } from "@prisma/client";

export class ProductService implements ProductServicePorts {
  constructor(private prisma: PrismaClient) {}

  async createProduct(product_name: string, product_price: number, product_stock_quantity: number): Promise<Products> {
    return this.prisma.products.create({ data: { product_name, product_price, product_stock_quantity } });
  }

  async updateProduct(product_id: string, product_name: string, product_price: number, product_stock_quantity: number): Promise<Products | null> {
    try {
      return this.prisma.products.update({ where: { product_id }, data: { product_name, product_price, product_stock_quantity } });
    } catch (err) {
      return null;
    }
  }

  getProductByID(product_id: string): Promise<Products | null> {
    return this.prisma.products.findUnique({ where: { product_id } });
  }

  getAllProducts(product_name: string | null, product_price: "desc" | "asc"): Promise<Products[] | []> {
    return this.prisma.products.findMany({
      where: product_name ? { product_name: { contains: product_name, mode: "insensitive" } } : {},
      orderBy: { product_price },
    });
  }

  async deleteProducts(product_id: string): Promise<Boolean> {
    try {
      await this.prisma.products.delete({
        where: { product_id },
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
