import type { Products } from "@prisma/client";

export interface ProductServicePorts {
  createProduct(product_name: string, product_price: number, product_stock_quantity: number): Promise<Products>;
  updateProduct(product_id: string, product_name: string, product_price: number, product_stock_quantity: number): Promise<Products | null>;
  getProductByID(product_id: string): Promise<Products | null>;
  getAllProducts(product_name: string, product_price: "desc" | "asc"): Promise<Products[] | []>;
  deleteProducts(product_id: string): Promise<Boolean>;
}
