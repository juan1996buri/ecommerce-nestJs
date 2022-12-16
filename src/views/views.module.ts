import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from './entities/view.entity';
import { Product } from 'src/product/entities/product.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([View, Product, UserDetail])],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
