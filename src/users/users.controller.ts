import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'user created successfull',
      user,
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'users fetched successfull',
      users,
    };
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.usersService.findOne(email);
    return {
      statusCode: HttpStatus.OK,
      message: 'user fetched successfull',
      user,
    };
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'product updated successfull',
      user,
    };
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    await this.usersService.remove(email);
    return {
      statusCode: HttpStatus.OK,
      message: 'user deleted successfull',
    };
  }
}
