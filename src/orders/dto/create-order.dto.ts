import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDetailDto } from 'src/user-details/dto/create-user-detail.dto';

export class CreateOrderDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  nOrder: number;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsNotEmpty()
  userDetail: CreateUserDetailDto;
}
