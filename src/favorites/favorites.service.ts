import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const favorite = this.favoriteRepository.create(createFavoriteDto);
    return await this.favoriteRepository.save(favorite);
  }

  async findAll() {
    const allFavorites = await this.favoriteRepository.find();

    if (allFavorites.length <= 0) {
      throw new NotFoundException('Favorites Not Found');
    }
    return allFavorites;
  }

  async findOne(productId: number, userId: number) {
    const favorite = await this.favoriteRepository.findOneBy({
      product: { id: productId },
      user: { id: userId },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite Not Found');
    }
    return favorite;
  }

  async remove(id: number) {
    const favorite = await this.favoriteRepository.findOneBy({
      product: { id },
    });
    this.favoriteRepository.remove(favorite);
  }
}
