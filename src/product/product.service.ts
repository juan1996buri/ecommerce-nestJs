import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const category = await this.findOneCategory(createProductDto.category.id);
    const newProduct = this.productRepository.create({
      ...createProductDto,
      category,
    });
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    const allProducts = await this.productRepository.find();
    if (allProducts.length <= 0) {
      throw new NotFoundException('Products Not Found');
    }
    return allProducts;
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
    const category = await this.findOneCategory(updateProductDto.category.id);
    const newProduct = Object.assign(oldProduct, {
      ...updateProductDto,
      category,
    });
    return await this.productRepository.save(newProduct);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    this.productRepository.remove(product);
  }

  async findOneCategory(id: number) {
    const category = await this.categoryRepository.findOneBy({
      id,
    });
    if (!category) {
      throw new NotFoundException('Category Not Found');
    }
    return category;
  }
}