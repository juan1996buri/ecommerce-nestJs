import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guard/roles.guard';

@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Roles('ADMIN', 'CLIENT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    const favorite = await this.favoritesService.create(createFavoriteDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Producto agregado a favoritos',
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

  @Get(':productId/:userId')
  async findOne(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
  ) {
    const favorite = await this.favoritesService.findOne(productId, userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Producto agregado a favoritos',
      favorite,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.favoritesService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Producto eliminado de favoritos',
    };
  }
}
