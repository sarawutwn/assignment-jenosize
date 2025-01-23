import { IsString, IsNumber, IsNotEmpty, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: "Product name is required" })
  product_name!: string;

  @IsNumber()
  @Min(0, { message: "Product price must be at least 0" })
  product_price!: number;

  @IsNumber()
  @Min(0, { message: "Stock quantity must be at least 0" })
  product_stock_quantity!: number;
}