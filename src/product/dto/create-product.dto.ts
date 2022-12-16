import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

export class CreateProductDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsString()
  description: string;

  @IsNotEmpty()
  category: CreateCategoryDto;
}
