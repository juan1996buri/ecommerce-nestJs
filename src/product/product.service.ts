import { Injectable, BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, PaginationQueryDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';

import { paginate } from 'nestjs-typeorm-paginate';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private cloudinary: CloudinaryService,
  ) {}
  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    let image;
    if (file) image = await this.uploadImageToCloudinary(file);
    if (image?.url) createProductDto.image = image.url;
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file, 'productsList').catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async findAll(pagination: PaginationQueryDto) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .where('category.name LIKE :name', { name: pagination.category });
    queryBuilder.orderBy('product.name', 'ASC');
    return paginate<Product>(queryBuilder, pagination);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const oldProduct = await this.findOne(updateProductDto.id);
    const newProduct = Object.assign(oldProduct, updateProductDto);
    return await this.productRepository.save(newProduct);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    this.productRepository.remove(product);
  }
}
