import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { Repository } from 'typeorm';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { View } from './entities/view.entity';

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(UserDetail)
    private readonly userDetailReposiotory: Repository<UserDetail>,
  ) {}

  async create(createViewDto: CreateViewDto) {
    const product = await this.findOneProduct(createViewDto.product.id);
    const userDetail = await this.findOneUserDetail(
      createViewDto.userDetail.id,
    );
    const view = this.viewRepository.create({
      ...createViewDto,
      product,
      userDetail,
    });
    return await this.viewRepository.save(view);
  }

  async findAll() {
    const views = await this.viewRepository.find();
    if (views.length <= 0) {
      throw new NotFoundException('Views not Found');
    }
    return views;
  }

  async findOne(id: number) {
    const views = await this.viewRepository.findOneBy({ id });
    if (!views) {
      throw new NotFoundException('Views Not Found');
    }
    return views;
  }

  async update(updateViewDto: UpdateViewDto) {
    const oldViews = await this.findOne(updateViewDto.id);
    const product = await this.findOneProduct(updateViewDto.product.id);
    const userDetail = await this.findOneUserDetail(
      updateViewDto.userDetail.id,
    );
    const newViews = Object.assign(oldViews, {
      ...updateViewDto,
      product,
      userDetail,
    });
    return this.viewRepository.save(newViews);
  }

  async remove(id: number) {
    await this.viewRepository.findOneBy({ id });
  }

  async findOneUserDetail(id: number) {
    const user = await this.userDetailReposiotory.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User detail Not Found');
    }
    return user;
  }

  async findOneProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    return product;
  }
}
