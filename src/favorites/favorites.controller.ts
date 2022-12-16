import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    const favorite = await this.favoritesService.create(createFavoriteDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Favorite created successfull',
      favorite,
    };
  }

  @Get()
  async findAll() {
    const favorites = await this.favoritesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Favorites fetched successfull',
      favorites,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const favorite = await this.favoritesService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Favorite fetched successfull',
      favorite,
    };
  }

  @Put()
  async update(@Body() updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoritesService.update(updateFavoriteDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Favorite updated successfull',
      favorite,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.favoritesService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Favorite deleted successfull',
    };
  }
}
