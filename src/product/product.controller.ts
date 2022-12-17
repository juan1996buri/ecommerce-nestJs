import {
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, PaginationQueryDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() pagination: PaginationQueryDto) {
    pagination.limit = pagination.limit > 100 ? 100 : pagination.limit;
    pagination.route = `http://localhost:4000/product?category=${pagination.category}`;
    const products = await this.productService.findAll(pagination);
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
