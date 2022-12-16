import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { Put } from '@nestjs/common/decorators';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'products fetched successfully',
      products,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'product fetched successfull',
      product,
    };
  }

  @Put()
  async update(@Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'product updated successfull',
      product,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'product deleted successfull',
    };
  }
}
