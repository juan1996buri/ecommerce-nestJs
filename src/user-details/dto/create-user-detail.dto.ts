import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateUserDetailDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  user: CreateUserDto;
}
