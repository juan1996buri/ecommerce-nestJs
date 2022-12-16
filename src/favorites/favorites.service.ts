import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Product } from 'src/product/entities/product.entity';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const userDetail = await this.findOneUserDetail(
      createFavoriteDto.userDetail.id,
    );
    const product = await this.findOneProduct(createFavoriteDto.product.id);

    const favorite = this.favoriteRepository.create({
      ...createFavoriteDto,
      userDetail,
      product,
    });
    return await this.favoriteRepository.save(favorite);
  }

  async findAll() {
    const allFavorites = await this.favoriteRepository.find();

    if (allFavorites.length <= 0) {
      throw new NotFoundException('Favorites Not Found');
    }
    return allFavorites;
  }

  async findOne(id: number) {
    const favorite = await this.favoriteRepository.findOneBy({ id });
    if (!favorite) {
      throw new NotFoundException('Favorite Not Found');
    }
    return favorite;
  }

  async update(updateFavoriteDto: UpdateFavoriteDto) {
    const oldFavorite = await this.findOne(updateFavoriteDto.id);
    const userDetail = await this.findOneUserDetail(
      updateFavoriteDto.userDetail.id,
    );
    const product = await this.findOneProduct(updateFavoriteDto.product.id);

    const newFavorite = Object.assign(oldFavorite, {
      ...updateFavoriteDto,
      userDetail,
      product,
    });
    return await this.favoriteRepository.save(newFavorite);
  }

  async remove(id: number) {
    const favorite = await this.findOne(id);
    this.favoriteRepository.remove(favorite);
  }

  async findOneProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    return product;
  }
  async findOneUserDetail(id: number) {
    const userDetail = await this.userDetailRepository.findOneBy({ id });
    if (!userDetail) {
      throw new NotFoundException('UserDetail Not Found');
    }
    return userDetail;
  }
}
