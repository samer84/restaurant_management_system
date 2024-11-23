/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  items: { name: string; quantity: number }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  customerName: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
