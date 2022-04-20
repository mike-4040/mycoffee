import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Event extends Document {
  // Note "entity" was removed from the class "name"
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop({ type: SchemaTypes.Mixed })
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
