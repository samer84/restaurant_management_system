/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'; // Core NestJS decorator to define a module
import { MongooseModule } from '@nestjs/mongoose'; // Module to integrate Mongoose (MongoDB) with NestJS
import { OrdersController } from './orders.controller'; // The controller that handles HTTP routes for orders
import { OrdersService } from './orders.service'; // The service that contains the business logic for orders
import { Order, OrderSchema } from './schemas/order.schema'; // Order schema definition for MongoDB

@Module({
  // Modules to import into this module
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), // Register the `Order` schema for MongoDB
  ],
  // Controllers to handle incoming HTTP requests for this module
  controllers: [OrdersController],
  // Services/providers for dependency injection
  providers: [OrdersService],
  // Exported modules or providers to be used in other modules
  exports: [MongooseModule],
})
export class OrdersModule {}
