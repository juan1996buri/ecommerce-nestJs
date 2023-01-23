import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateFavoriteDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  product: CreateProductDto;

  @IsNotEmpty()
  user: CreateUserDto;
}
