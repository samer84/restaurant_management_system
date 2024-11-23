/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common'; // NestJS decorators for defining routes and handling HTTP requests
import { OrdersService } from './orders.service'; // Service that handles business logic for orders
import { CreateOrderDto } from './dto/create-order.dto'; // DTO for creating a new order
import { UpdateOrderDto } from './dto/update-order.dto'; // DTO for updating an existing order

@Controller('orders') // Define the base route as 'orders'
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Create a new order
   * @param createOrderDto - DTO containing order details
   * @returns The created order
   */
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(createOrderDto);
  }

  /**
   * Get details of a specific order by ID
   * @param id - Order ID
   * @returns The order details
   */
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrderById(id);
  }

  /**
   * Update an existing order
   * @param id - Order ID
   * @param updateOrderDto - DTO containing updated order details
   * @returns The updated order
   */
  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.updateOrder(id, updateOrderDto);
  }

  /**
   * Get a list of all orders
   * @returns An array of all orders
   */
  @Get()
  async getAllOrders() {
    return await this.ordersService.getAllOrders();
  }
}
