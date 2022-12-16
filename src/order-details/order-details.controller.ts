import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = await this.orderDetailsService.create(
      createOrderDetailDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Order detail created successfull',
      orderDetail,
    };
  }

  @Get()
  async findAll() {
    const orderDetails = await this.orderDetailsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Order details fetched successfull ',
      orderDetails,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const orderDetail = await this.orderDetailsService.findOne(id);
    return {
      statuCode: HttpStatus.OK,
      message: 'Order detail fetched successfull',
      orderDetail,
    };
  }

  @Put(':id')
  async update(@Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.orderDetailsService.update(
      updateOrderDetailDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Order detail updated successfull',
      orderDetail,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.orderDetailsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order detail deleted successfull',
    };
  }
}
