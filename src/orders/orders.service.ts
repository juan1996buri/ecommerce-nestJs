import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepositry: Repository<UserDetail>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const userDetail = await this.userDetailRepositry.findOneBy({
      id: createOrderDto.userDetail.id,
    });
    const order = this.orderRepository.create({
      ...createOrderDto,
      userDetail,
    });
    return await this.orderRepository.save(order);
  }

  async findAll() {
    const allOrders = await this.orderRepository.find();
    if (allOrders.length <= 0) {
      throw new NotFoundException('Orders Not Found');
    }
    return allOrders;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order Not Found');
    }
    return order;
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const oldOrder = await this.findOne(updateOrderDto.id);
    const newOrder = Object.assign(oldOrder, updateOrderDto);
    return await this.orderRepository.save(newOrder);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
