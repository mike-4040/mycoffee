import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coffee extends Document {
  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop([String])
  flavors: string[];

  @Prop({ default: 0 })
  recommendatins: number;
}

export const CoffeSchema = SchemaFactory.createForClass(Coffee);
