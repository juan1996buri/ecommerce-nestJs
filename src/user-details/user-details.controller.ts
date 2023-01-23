import { UserDetailsService } from './user-details.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { HttpStatus } from '@nestjs/common/enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';

@Controller('api/user-details')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Post()
  async create(@Body() createUserDetailDto: CreateUserDetailDto) {
    const userDetail = await this.userDetailsService.create(
      createUserDetailDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'user detail created successfull',
      userDetail,
    };
  }

  @Get()
  async findAll() {
    const userDetails = await this.userDetailsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'user detail fetched successfull',
      userDetails,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userDetail = await this.userDetailsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'user detail fetched successfull',
      userDetail,
    };
  }

  @Put(':id')
  async update(@Body() updateUserDetailDto: UpdateUserDetailDto) {
    const userDetail = await this.userDetailsService.update(
      updateUserDetailDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'user detail updated successfull',
      userDetail,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.userDetailsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'user detail deleted successfull',
    };
  }
}
