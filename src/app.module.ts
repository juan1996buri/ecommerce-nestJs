import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Role } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ViewsModule } from './views/views.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'ecommerce',
      entities: [Role],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RolesModule,
    UsersModule,
    CategoryModule,
    ProductModule,
    OrdersModule,
    UserDetailsModule,
    OrderDetailsModule,
    FavoritesModule,
    ViewsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
