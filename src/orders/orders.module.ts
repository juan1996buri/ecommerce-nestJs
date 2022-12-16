import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, UserDetail])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
