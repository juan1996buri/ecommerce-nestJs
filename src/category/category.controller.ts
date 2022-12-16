import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'product created successfull',
      category,
    };
  }

  @Get()
  async findAll() {
    const allCategories = await this.categoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'categories fetched successfull',
      allCategories,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const category = await this.categoryService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'category fetched successfull',
      category,
    };
  }

  @Put()
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    const product = await this.categoryService.update(updateCategoryDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'category updated successfull',
      product,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.categoryService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'category deleted succesfull',
    };
  }
}
