import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class CreateOrderDetailDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  units: number;

  @IsNotEmpty()
  product: CreateProductDto;

  @IsNotEmpty()
  order: CreateOrderDto;
}
