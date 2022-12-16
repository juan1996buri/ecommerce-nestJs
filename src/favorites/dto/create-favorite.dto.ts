import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { CreateUserDetailDto } from 'src/user-details/dto/create-user-detail.dto';

export class CreateFavoriteDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  state: boolean;

  @IsNotEmpty()
  product: CreateProductDto;

  @IsNotEmpty()
  userDetail: CreateUserDetailDto;
}
