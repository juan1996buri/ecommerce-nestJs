import {
  IsString,
  IsInt,
  IsOptional,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

export class CreateUserDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  state: boolean;

  @IsOptional()
  role: CreateRoleDto;
}
