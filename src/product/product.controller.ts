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
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, PaginationQueryDto, UpdateProductDto } from './dto';
import { RolesGuard } from 'src/roles/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //&@Roles('ADMIN')
  //@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'product deleted successfull',
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.create(createProductDto, file);
  }
}
