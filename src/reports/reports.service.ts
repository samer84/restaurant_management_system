/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/schemas/order.schema';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async generateDailyReport(date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const report = await this.orderModel.aggregate([
      // Match orders within the specified date range
      { $match: { timestamp: { $gte: startOfDay, $lte: endOfDay } } },
      
      // Decompose items array into individual items
      { $unwind: '$items' },
      
      // Group by item name to calculate total quantity and revenue per item
      { 
        $group: {
          _id: '$items.name',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },

      // Prepare a summary of the report
      { 
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalRevenue' },
          orderCount: { $sum: 1 },
          topSellingItems: { $push: { name: '$_id', quantity: '$totalQuantity' } }
        }
      },

      // Final formatting of the result
      { 
        $project: {
          _id: 0,
          totalRevenue: 1,
          orderCount: 1,
          topSellingItems: 1
        }
      }
    ]);

    // Return the result or a default empty report
    return report.length > 0 ? report[0] : { totalRevenue: 0, orderCount: 0, topSellingItems: [] };
  }
}
