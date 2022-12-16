import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  async create(@Body() createViewDto: CreateViewDto) {
    const views = await this.viewsService.create(createViewDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Views updated successfull',
      views,
    };
  }

  @Get()
  async findAll() {
    const views = await this.viewsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'views fetched successfull',
      views,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const views = await this.viewsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Views fetched successfull',
      views,
    };
  }

  @Put()
  async update(@Body() updateViewDto: UpdateViewDto) {
    const views = await this.viewsService.update(updateViewDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'views updated successfull',
      views,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.viewsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'views deleted successfull',
    };
  }
}
