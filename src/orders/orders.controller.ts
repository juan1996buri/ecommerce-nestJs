import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'order created successfull',
      order,
    };
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'orders fetched success ',
      orders,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const order = await this.ordersService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'order fetched successfull',
      order,
    };
  }

  @Put()
  async update(@Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersService.update(updateOrderDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'order updated successfull',
      order,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order deleted successfull',
    };
  }
}
