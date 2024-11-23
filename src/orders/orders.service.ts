/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'; // Marks the class as a provider to be injected as a dependency
import { InjectModel } from '@nestjs/mongoose'; // Decorator to inject a Mongoose model into the service
import { Model } from 'mongoose'; // Interface representing a Mongoose model
import { Order } from './schemas/order.schema'; // The Mongoose schema for an order
import { CreateOrderDto } from './dto/create-order.dto'; // DTO for creating an order
import { UpdateOrderDto } from './dto/update-order.dto'; // DTO for updating an order

@Injectable()
export class OrdersService {
  // Injecting the Mongoose model for the `Order` schema
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  // Create a new order
  async createOrder(createOrderDto: CreateOrderDto) {
    const newOrder = new this.orderModel(createOrderDto); // Create a new order document
    return await newOrder.save(); // Save the order document to the database
  }

  // Retrieve an order by its unique ID
  async getOrderById(id: string) {
    return await this.orderModel.findById(id); // Find an order document by its `_id`
  }

  // Update an existing order by its unique ID
  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderModel.findByIdAndUpdate(
      id, // The ID of the order to update
      updateOrderDto, // The fields to update
      { new: true }, // Return the updated document
    );
  }

  // Retrieve all orders
  async getAllOrders() {
    return await this.orderModel.find(); // Retrieve all documents in the `orders` collection
  }
}
