import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const order = await this.findOneOrder(createOrderDetailDto.order.id);
    const product = await this.findOneProduct(createOrderDetailDto.product.id);

    const orderDetail = this.orderDetailRepository.create({
      ...createOrderDetailDto,
      order,
      product,
    });
    return await this.orderDetailRepository.save(orderDetail);
  }

  async findAll() {
    const allOrderDetails = await this.orderDetailRepository.find();
    if (allOrderDetails.length <= 0) {
      throw new NotFoundException('Order details Not Found');
    }
    return allOrderDetails;
  }

  async findOne(id: number) {
    const orderDetail = await this.orderDetailRepository.findOneBy({ id });
    if (!orderDetail) {
      throw new NotFoundException('Order detail Not found');
    }
    return orderDetail;
  }

  async update(updateOrderDetailDto: UpdateOrderDetailDto) {
    const oldOrderDetail = await this.findOne(updateOrderDetailDto.id);
    const order = await this.findOneOrder(updateOrderDetailDto.order.id);
    const product = await this.findOneProduct(updateOrderDetailDto.product.id);
    const newOrderDetail = Object.assign(oldOrderDetail, {
      ...updateOrderDetailDto,
      order,
      product,
    });
    return await this.orderDetailRepository.save(newOrderDetail);
  }

  async remove(id: number) {
    const orderDetail = await this.findOne(id);
    await this.orderDetailRepository.remove(orderDetail);
  }

  async findOneOrder(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order Not Found');
    }
    return order;
  }

  async findOneProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    return product;
  }
}
