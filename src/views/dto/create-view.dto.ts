import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { CreateUserDetailDto } from 'src/user-details/dto/create-user-detail.dto';

export class CreateViewDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  userDetail: CreateUserDetailDto;

  @IsNotEmpty()
  product: CreateProductDto;
}
